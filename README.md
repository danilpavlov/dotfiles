# dotfiles

My personal dotfiles, managed with [chezmoi](https://www.chezmoi.io/).

Tested on:
- **macOS** (Sonoma+)
- **Arch Linux** (Hyprland + sddm)
- **Raspberry Pi OS / Debian** (minimal headless CLI)

## Install on a new machine

### Prereqs
- Install [chezmoi](https://www.chezmoi.io/install/):
  - macOS: `brew install chezmoi`
  - Arch: `sudo pacman -S chezmoi`

### Bootstrap
```sh
chezmoi init --apply git@github.com:danilpavlov/dotfiles.git
```

This will:
1. Clone the repo into `~/.local/share/chezmoi`.
2. Run `run_once_before_*` scripts to install oh-my-zsh and its plugins.
3. Render templates and write your `~/.zshrc`, `~/.config/...` files.
4. Run `run_onchange_30-install-packages.sh` to install the packages from the manifest (`Brewfile` on macOS, `pacman` + AUR via `paru` on Arch, `apt` on Debian/Raspberry Pi OS).
5. On Linux, run `run_once_after_40-install-snx-rs.sh` to build the snx-rs VPN client from source if it isn't already present.

After it finishes, copy and fill in the secrets templates:
```sh
cp ~/.config/zsh/work.zsh.example ~/.config/zsh/work.zsh
$EDITOR ~/.config/zsh/work.zsh

cp ~/.config/snx-rs/vpn.conf.example ~/.config/snx-rs/vpn.conf
$EDITOR ~/.config/snx-rs/vpn.conf
```

Open a new terminal and you're done.

## VPN (snx-rs)

The `~/.local/bin/vpn` launcher starts the [snx-rs](https://github.com/ancwrd1/snx-rs)
Check Point VPN client. Connection parameters (server, login type, user, routes
to ignore) live in `~/.config/snx-rs/vpn.conf` — gitignored, copied from
`vpn.conf.example`. `~/.local/bin/home-tmux.sh` runs the tunnel inside a detached
`HOME` tmux session at login.

`vpn` calls `sudo -n snx-rs`, so the binary needs passwordless sudo. Add a
sudoers drop-in, e.g.:
```sh
echo "$USER ALL=(root) NOPASSWD: $(command -v snx-rs)" | sudo tee /etc/sudoers.d/snx-rs
```

`VPN_IGNORE_ROUTES` drops corporate routes that overlap local docker subnets,
which would otherwise hijack host→container traffic.

### Unattended reconnects (`vpn-daemon`)

`~/.local/bin/vpn-daemon` keeps the tunnel up without typing anything: when
snx-rs exits it polls the [indeed-key-parser](https://github.com/danilpavlov/indeed-key-parser)
webhook for a fresh Indeed Key code, then relaunches snx-rs with the code on
factor 1 and the AD password on factor 2 (`VPN_PASSWORD_FACTOR`). Codes reach
the webhook only when you tap the token in Indeed Key, so the daemon sends a
desktop notification while it waits. A tunnel started by hand with `vpn` is
adopted, not restarted.

It reads `vpn.conf` for the gateway settings; the webhook URL/token and the
password come from the environment — for the user unit that is
`~/.config/snx-rs/vpn-daemon.env` (copy `vpn-daemon.env.example`, `chmod 600`):

```sh
systemctl --user enable --now vpn-daemon.service
vpnctl status          # daemon state, snx-rs pid, tunnel interface
vpnctl stop|start|restart|reconnect|logs
```

The one-time code is passed as `-F <code>` on the snx-rs command line: the
config-file `mfa-code` key needs an snx-rs built after 2026-08-05, and older
builds silently ignore it and fall back to a TTY prompt. Root-owned snx-rs
output is not visible in `journalctl --user`; use
`sudo journalctl _SYSTEMD_USER_UNIT=vpn-daemon.service`.

Set `VPN_DAEMON_DRY_RUN=1` to see what it would launch without touching snx-rs.

## Raspberry Pi / Debian

Minimal headless CLI environment (shell, tmux, nvim, cli tools) installed via
`apt` from `packages/debian-apt.txt`. `fd`/`bat` are symlinked from Debian's
`fdfind`/`batcat`, and `eza` is installed from the maintainer's apt repo. The
snx-rs VPN client is built from source for ARM by `run_once_after_40-install-snx-rs.sh`.

`prometheus-node-exporter` is installed from the same apt list. It ships its own
systemd service (enabled + started automatically) exposing host metrics — CPU,
RAM, disk, network, and chip temperature via the hwmon collector — at
`http://<pi>:9100/metrics`. Point a Prometheus instance at that target to scrape
it. Check it's up with `systemctl status prometheus-node-exporter` and
`curl -s localhost:9100/metrics | head`.

## Layout

```
dotfiles/
├── dot_zshrc.tmpl              # → ~/.zshrc  (thin, sources modules)
├── dot_config/
│   ├── zsh/
│   │   ├── aliases.zsh         # shared aliases
│   │   ├── functions.zsh       # dev() and friends
│   │   ├── exports.zsh         # env vars + tool integrations
│   │   ├── path.zsh            # PATH wiring + pyenv init
│   │   └── work.zsh.example    # template for per-machine secrets
│   ├── snx-rs/
│   │   └── vpn.conf.example    # template for VPN connection params
│   ├── nvim/                   # LazyVim
│   ├── tmux/tmux.conf
│   ├── ghostty/config.tmpl     # OS-templated (cmd+s on macOS, ctrl+s on Linux)
│   ├── bat/, btop/, eza/, htop/, posting/
│   └── hypr/                   # Hyprland — populated on Arch
├── dot_local/bin/
│   ├── executable_vpn          # snx-rs VPN launcher (reads ~/.config/snx-rs/vpn.conf)
│   └── executable_home-tmux.sh # detached HOME tmux session running the tunnel
├── packages/
│   ├── Brewfile
│   ├── arch-pacman.txt
│   ├── arch-aur.txt
│   └── debian-apt.txt          # Raspberry Pi / Debian, minimal headless CLI
├── run_once_before_10-install-omz.sh.tmpl
├── run_once_before_20-install-omz-plugins.sh.tmpl
├── run_onchange_30-install-packages.sh.tmpl
├── run_once_after_40-install-snx-rs.sh.tmpl   # build snx-rs from source on Linux
└── docs/                       # spec + plan history
```

## Adding new config

1. `chezmoi add ~/.config/<tool>/<file>` — pulls the file into the source dir.
2. Edit in the source dir: `chezmoi edit ~/.config/<tool>/<file>`.
3. Apply: `chezmoi apply`.
4. Commit in the dotfiles repo.

For OS-specific bits, rename the file to `<name>.tmpl` and use Go template directives:
```
{{ if eq .chezmoi.os "darwin" -}}
mac-only line
{{- else if eq .chezmoi.os "linux" -}}
linux-only line
{{- end }}
```

## Secrets

Don't commit them. `~/.config/zsh/work.zsh` and `~/.config/snx-rs/vpn.conf` are
gitignored. Their example files (`work.zsh.example`, `vpn.conf.example`) are
committed as templates.

## Wallpapers

Live in their own repo: https://github.com/danilpavlov/wallpapers

## nvim keys (LazyVim)

- `gd` — go to definition
- `gr` — go to references
- `gc` — toggle comment (visual)
- `<space><space>` — telescope find file
- `<space>/` — telescope grep
