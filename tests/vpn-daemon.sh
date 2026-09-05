#!/usr/bin/env bash
# Unit tests for the health watchdog in dot_local/bin/executable_vpn-daemon.
#
# The daemon is sourced with VPN_DAEMON_SOURCED=1 and the parts that touch the
# world — dns_probe, pgrep, sudo, notify — are replaced with shell functions.
# Every case runs in its own subshell with a deadline, and every case ends on
# its own: either health_watch kills the (fake) tunnel, or the pgrep stub
# starts reporting a different pid so the watcher returns quietly. Never stop
# a case by killing a background job: `( health_watch | sed ) & kill $!` only
# kills the outer subshell and leaves health_watch spinning as an orphan.
#
# Stubs that need to count calls keep the counter in a file: the daemon calls
# pgrep inside `$(...)`, so a shell variable bumped there is lost on return.
#
#   bash tests/vpn-daemon.sh            # run all
#   bash tests/vpn-daemon.sh -v         # also print each case's log
set -u

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DAEMON="$HERE/../dot_local/bin/executable_vpn-daemon"
VERBOSE="${1:-}"
DEADLINE=15
FAILED=0
PASSED=0

# Shared stubs. Each case may redefine any of them after calling setup.
setup() {
    VPN_DAEMON_SOURCED=1
    # shellcheck source=../dot_local/bin/executable_vpn-daemon
    . "$DAEMON"
    VPN_HEALTH_DNS="203.0.113.1,203.0.113.2"
    VPN_HEALTH_NAME="probe.invalid"
    VPN_HEALTH_TIMEOUT=1
    VPN_HEALTH_GRACE=0
    VPN_HEALTH_INTERVAL=0
    VPN_HEALTH_FAILURES=3
    VPN_HEALTH_KILL_WAIT=2
    VPN_NOTIFY=false
    TUNNEL_PID=999999
    SIGNALS_FILE="$(mktemp)"
    COUNTER_FILE="$(mktemp)"
    echo 0 > "$COUNTER_FILE"
    notify() { :; }
    # Records what the daemon asked root for; never touches a real tunnel.
    sudo() { printf '%s\n' "$*" >> "$SIGNALS_FILE"; return 0; }
    # Default tunnel: alive until SIGTERM was recorded.
    pgrep() {
        if grep -q -- '-TERM' "$SIGNALS_FILE" 2>/dev/null; then return 1; fi
        echo "$TUNNEL_PID"
    }
    dns_probe() { return 1; }
}

# bump — increments the per-case counter file and prints the new value.
bump() { local n; n=$(( $(cat "$COUNTER_FILE") + 1 )); echo "$n" > "$COUNTER_FILE"; echo "$n"; }

# run_case NAME BODY-FUNCTION — BODY runs in a subshell after setup; its
# stdout+stderr become $OUT, the recorded sudo calls become $SIGNALS.
run_case() {
    local name="$1" body="$2" tmp
    tmp="$(mktemp)"
    (
        setup
        printf '%s\n%s\n' "$SIGNALS_FILE" "$COUNTER_FILE" > "$tmp"
        "$body"
    ) > "$tmp.out" 2>&1 &
    local pid=$! waited=0 rc=0
    while kill -0 "$pid" 2>/dev/null; do
        if [ "$waited" -ge "$DEADLINE" ]; then
            pkill -TERM -P "$pid" 2>/dev/null; kill -TERM "$pid" 2>/dev/null
            rc=124; break
        fi
        sleep 1; waited=$(( waited + 1 ))
    done
    wait "$pid" 2>/dev/null
    CASE="$name"
    CASE_OK=1
    OUT="$(cat "$tmp.out")"
    SIGNALS="$(cat "$(sed -n 1p "$tmp")" 2>/dev/null)"
    rm -f "$tmp.out" "$(sed -n 1p "$tmp")" "$(sed -n 2p "$tmp")" "$tmp"
    if [ "$rc" -eq 124 ]; then
        fail "did not finish within ${DEADLINE}s — health_watch never returned"
    fi
    [ -n "$VERBOSE" ] && printf '\n--- %s ---\n%s\n--- sudo calls ---\n%s\n' "$name" "$OUT" "$SIGNALS"
    return 0
}

fail() { printf 'FAIL  %s: %s\n' "$CASE" "$*"; CASE_OK=0; }
finish() {
    if [ "$CASE_OK" -eq 1 ]; then printf 'ok    %s\n' "$CASE"; PASSED=$(( PASSED + 1 ))
    else FAILED=$(( FAILED + 1 )); fi
}
count() { printf '%s\n' "$1" | grep -c -- "$2"; }

# 1. Tunnel silent: SIGTERM after exactly VPN_HEALTH_FAILURES rounds, no SIGKILL.
case_silent_tunnel() { health_watch; }

run_case "silent tunnel is killed after 3 failed rounds" case_silent_tunnel
[ "$(count "$OUT" 'health check failed')" -eq 3 ] || fail "expected 3 failed rounds, got: $OUT"
[ "$(count "$OUT" 'killing snx-rs (pid 999999)')" -eq 1 ] || fail "no kill logged"
[ "$(count "$SIGNALS" 'pkill -TERM -x snx-rs')" -eq 1 ] || fail "SIGTERM not sent exactly once: $SIGNALS"
[ "$(count "$SIGNALS" 'pkill -KILL')" -eq 0 ] || fail "SIGKILL sent although snx-rs exited on SIGTERM"
finish

# 2. Probe recovers on the 3rd round: the counter resets and nothing is killed.
#    The tunnel "ends" (pgrep reports another pid) after 8 rounds so the
#    watcher returns on its own.
case_recovers() {
    ATTEMPT=0
    dns_probe() { ATTEMPT=$(( ATTEMPT + 1 )); [ "$ATTEMPT" -ge 5 ] && return 0; return 1; }
    pgrep() { if [ "$(bump)" -gt 8 ]; then echo 111111; else echo "$TUNNEL_PID"; fi; }
    health_watch
}
run_case "recovery resets the failure counter" case_recovers
[ "$(count "$OUT" 'health check failed (2/3)')" -eq 1 ] || fail "expected the counter to reach 2/3: $OUT"
[ "$(count "$OUT" 'recovered after 2 failed')" -eq 1 ] || fail "no recovery logged: $OUT"
[ "$(count "$OUT" 'killing snx-rs')" -eq 0 ] || fail "tunnel was killed despite recovery"
[ -z "$SIGNALS" ] || fail "sudo was called: $SIGNALS"
finish

# 3. Session replaced while the watcher slept: it must not touch the new one.
case_replaced() {
    pgrep() { if [ "$(bump)" -le 1 ]; then echo "$TUNNEL_PID"; else echo 111111; fi; }
    health_watch
}
run_case "replaced session is left alone" case_replaced
[ -z "$OUT" ] || fail "expected a silent return, got: $OUT"
[ -z "$SIGNALS" ] || fail "sudo was called: $SIGNALS"
finish

# 4. snx-rs ignores SIGTERM: SIGKILL follows after VPN_HEALTH_KILL_WAIT seconds.
case_term_ignored() {
    pgrep() {
        if grep -q -- '-KILL' "$SIGNALS_FILE" 2>/dev/null; then return 1; fi
        echo "$TUNNEL_PID"
    }
    health_watch
}
run_case "SIGKILL after SIGTERM is ignored" case_term_ignored
[ "$(count "$SIGNALS" 'pkill -TERM -x snx-rs')" -eq 1 ] || fail "SIGTERM not sent once: $SIGNALS"
[ "$(count "$SIGNALS" 'pkill -KILL -x snx-rs')" -eq 1 ] || fail "SIGKILL not sent once: $SIGNALS"
[ "$(count "$OUT" 'ignored SIGTERM for 2s')" -eq 1 ] || fail "escalation not logged after KILL_WAIT: $OUT"
finish

# 5. sudo refuses: a warning, and the watcher still returns instead of hanging.
case_sudo_refused() {
    sudo() { return 1; }
    health_watch
}
run_case "sudo refusal is logged, watcher returns" case_sudo_refused
[ "$(count "$OUT" 'could not signal snx-rs')" -eq 1 ] || fail "no warning logged: $OUT"
finish

# 6. Nothing to watch: no snx-rs after the grace period means a quiet return.
case_no_tunnel() {
    pgrep() { return 1; }
    health_watch
}
run_case "no tunnel after grace returns quietly" case_no_tunnel
[ -z "$OUT" ] || fail "expected silence, got: $OUT"
finish

printf '\n%d passed, %d failed\n' "$PASSED" "$FAILED"
[ "$FAILED" -eq 0 ]
