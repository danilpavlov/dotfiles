# Dotfiles macOS+Arch Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `~/dotfiles` under chezmoi with hybrid OS-templating so the repo deploys cleanly on both macOS and Arch (Hyprland deferred).

**Architecture:** chezmoi source root at repo root. Common configs live as plain files; `.zshrc` and `ghostty/config` use Go templates with `{{ if eq .chezmoi.os "darwin" }}` blocks. Vendored frameworks (oh-my-zsh, gpakosz/.tmux) deleted; bootstrap scripts install them via curl/pacman/brew. Work secrets live in `~/.config/zsh/work.zsh` outside git.

**Tech Stack:** chezmoi, zsh, ghostty, neovim/LazyVim, tmux. Package managers: Homebrew (macOS), pacman + paru/AUR (Arch).

**Spec reference:** `docs/superpowers/specs/2026-05-30-dotfiles-arch-migration-design.md`

**Critical starting facts (verified):**
- chezmoi is NOT yet installed locally.
- `$HOME/.config` and `$HOME/.zshrc` are regular files, NOT symlinks to the repo. The repo is currently just a manually-maintained snapshot.
- `$HOME/.zshrc` (197 lines) differs from `dotfiles/.config/.zshrc` (196 lines). **`$HOME` is the source of truth.**
- Tracked gitlinks (broken submodule pointers without `.gitmodules`): `.oh-my-zsh`, `.tmux/plugins/tpm`, `.zsh/zsh-autosuggestions`, `.config/bat/themes/sublime-snazzy`. Each must be removed from index AND from disk (where present).
- `.config/tmux/.tmux.conf` (51 lines) and `.config/tmux/tmux.conf` (34 lines) both exist in repo. We keep `tmux.conf`.
- Some files exist in working tree but aren't tracked: `.config/btop/btop.log`, `.config/htop/htoprc.tmp.*`, `.DS_Store`, on-disk contents of `.oh-my-zsh/` (21MB) and `.tmux/` (1.1MB). These get cleaned from disk too.

**Risk gates (require explicit user confirmation during execution):**
- Phase 6 — creating new GitHub repo for wallpapers and pushing to it.
- Phase 7 — final `chezmoi apply` against the live `$HOME` (first time `$HOME` becomes chezmoi-managed).
- Phase 9 — `git push` to origin.

---

## File Structure Overview

Files created/modified across the plan:

**Created:**
- `.chezmoiroot`, `.chezmoiignore`, `.chezmoidata.yaml` — chezmoi metadata
- `dot_zshrc.tmpl` — top-level `.zshrc` template
- `dot_config/zsh/{aliases,functions,exports,path}.zsh` — modular zsh
- `dot_config/zsh/work.zsh.example` — secrets template
- `dot_config/ghostty/config.tmpl` — keybind/titlebar templating
- `packages/{Brewfile,arch-pacman.txt,arch-aur.txt}` — package manifests
- `run_once_before_10-install-omz.sh.tmpl`, `run_once_before_20-install-omz-plugins.sh.tmpl`, `run_onchange_30-install-packages.sh.tmpl` — bootstrap

**Renamed / restructured:**
- `.config/` → `dot_config/` (chezmoi convention)
- `.config/ghostty/config` → `dot_config/ghostty/config.tmpl` (with template content)

**Deleted:**
- `.oh-my-zsh/` (gitlink + 21MB on disk)
- `.tmux/` (gitlink + regular files + 1.1MB on disk)
- `.zsh/` (gitlink)
- `.config/bat/themes/sublime-snazzy` (gitlink)
- `.config/tmux/.tmux.conf` (duplicate)
- `.config/thefuck/__pycache__/` (cache)
- `.config/.zshrc` (was in wrong location)
- `.config/btop/btop.log`, `.config/htop/htoprc.tmp.*`, `.DS_Store` (untracked junk)
- `wallpapers/` (moves to separate repo)

**Modified:**
- `.gitignore` — add `*.log`, `*.tmp.*`, `__pycache__/`, `.DS_Store`, `dot_config/zsh/work.zsh`
- `README.md` — rewrite for chezmoi flow

---

## Phase 0 — Preconditions

### Task 0.1: Install chezmoi locally

**Files:** none (system install)

- [ ] **Step 1: Verify chezmoi is missing**

Run: `command -v chezmoi || echo MISSING`
Expected: prints `MISSING` (otherwise skip remaining steps in this task).

- [ ] **Step 2: Install chezmoi via Homebrew**

Run: `brew install chezmoi`

- [ ] **Step 3: Verify install**

Run: `chezmoi --version`
Expected: prints a version string starting with `chezmoi version v2.` (e.g. `chezmoi version v2.51.0`).

- [ ] **Step 4: No commit** (system change, not repo change)

---

## Phase 1 — Backup and chezmoi source root setup

### Task 1.1: Snapshot live `$HOME` state for safety

**Files:** none (creates tarball outside the repo)

- [ ] **Step 1: Create a backup tarball**

Run:
```bash
tar -czf "$HOME/dotfiles-backup-$(date +%Y%m%d-%H%M%S).tgz" \
  --exclude='.config/google-chrome' \
  --exclude='.config/Code' \
  --exclude='.config/configstore' \
  --exclude='.config/coc' \
  -C "$HOME" .zshrc .config .oh-my-zsh .tmux 2>/dev/null || true
ls -lh "$HOME"/dotfiles-backup-*.tgz | tail -1
```
Expected: prints a tarball ≥ 100 KB. If it's smaller, abort and investigate.

- [ ] **Step 2: Note the backup path**

Write down the tarball name from the previous step. If something goes wrong later we can `tar -xzf <backup> -C ~` to restore.

- [ ] **Step 3: No commit**

---

### Task 1.2: Wire the repo as chezmoi source root

**Files:**
- Create: `/Users/pavlov/dotfiles/.chezmoiroot`
- Create: `/Users/pavlov/dotfiles/.chezmoidata.yaml`

- [ ] **Step 1: Create `.chezmoiroot`**

Run:
```bash
touch /Users/pavlov/dotfiles/.chezmoiroot
```
The file must exist and be empty. (Empty `.chezmoiroot` means "the chezmoi source root IS the repo root" — which is what we want. A non-empty file would point to a subdirectory.)

- [ ] **Step 2: Create `.chezmoidata.yaml`**

Write `/Users/pavlov/dotfiles/.chezmoidata.yaml`:
```yaml
name: Daniil Pavlov
email: daniil1pavlov1@gmail.com
editor: nvim
```

- [ ] **Step 3: Tell chezmoi where the source is**

Create `~/.config/chezmoi/chezmoi.toml` (this stays out of git — it's per-machine):
```bash
mkdir -p ~/.config/chezmoi
cat > ~/.config/chezmoi/chezmoi.toml <<'EOF'
sourceDir = "/Users/pavlov/dotfiles"
EOF
```

- [ ] **Step 4: Verify chezmoi sees the source**

Run: `chezmoi source-path`
Expected: prints `/Users/pavlov/dotfiles`.

- [ ] **Step 5: Verify template rendering works**

Run: `chezmoi execute-template '{{ .chezmoi.os }} / {{ .name }}'`
Expected: prints `darwin / Daniil Pavlov`.

- [ ] **Step 6: Commit**

```bash
cd /Users/pavlov/dotfiles
git add .chezmoiroot .chezmoidata.yaml
git commit -m "$(cat <<'EOF'
chore: add chezmoi source-root metadata

Empty .chezmoiroot anchors the source dir at the repo root.
.chezmoidata.yaml holds user-level template variables (name/email/editor).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 — Cleanup

### Task 2.1: Remove broken gitlinks and on-disk vendored content

**Files:**
- Delete from index: `.oh-my-zsh`, `.tmux/plugins/tpm`, `.tmux/.tmux.conf`, `.zsh/zsh-autosuggestions`, `.config/bat/themes/sublime-snazzy`, `.config/tmux/.tmux.conf`
- Delete from disk: `.oh-my-zsh/`, `.tmux/`, `.zsh/`

- [ ] **Step 1: Remove gitlinks and tracked files from the index**

Run:
```bash
cd /Users/pavlov/dotfiles
git rm --cached .oh-my-zsh
git rm --cached .tmux/plugins/tpm
git rm --cached .tmux/.tmux.conf
git rm --cached .zsh/zsh-autosuggestions
git rm --cached .config/bat/themes/sublime-snazzy
git rm --cached .config/tmux/.tmux.conf
```

Each should print `rm '<path>'`.

- [ ] **Step 2: Remove from disk**

Run:
```bash
rm -rf /Users/pavlov/dotfiles/.oh-my-zsh
rm -rf /Users/pavlov/dotfiles/.tmux
rm -rf /Users/pavlov/dotfiles/.zsh
```

- [ ] **Step 3: Verify they're gone**

Run: `ls /Users/pavlov/dotfiles/.oh-my-zsh /Users/pavlov/dotfiles/.tmux /Users/pavlov/dotfiles/.zsh 2>&1 | sort -u`
Expected: three "No such file or directory" lines.

- [ ] **Step 4: Verify git status is sane**

Run: `git -C /Users/pavlov/dotfiles status`
Expected: shows staged deletions for the six removed paths, no other surprises.

- [ ] **Step 5: Commit**

```bash
cd /Users/pavlov/dotfiles
git commit -m "$(cat <<'EOF'
chore: remove vendored frameworks and broken gitlinks

Drop .oh-my-zsh, .tmux/, .zsh/zsh-autosuggestions, and an unused
sublime-snazzy bat theme — these were tracked as bare submodule
pointers (no .gitmodules) and 22 MB of stray working-tree content.
They'll be installed by the bootstrap scripts on each host.

Also drop the duplicate gpakosz-style .config/tmux/.tmux.conf
(we keep .config/tmux/tmux.conf).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2.2: Remove tracked junk

**Files:**
- Delete from index: `.config/thefuck/__pycache__/settings.cpython-313.pyc`

- [ ] **Step 1: Find any other tracked cache/log files**

Run:
```bash
git -C /Users/pavlov/dotfiles ls-files | grep -E '(__pycache__|\.log$|\.tmp\.|\.DS_Store)' || echo "NONE"
```
Expected: prints exactly `.config/thefuck/__pycache__/settings.cpython-313.pyc`. If more appears, add them to the next step.

- [ ] **Step 2: Remove from index**

```bash
git -C /Users/pavlov/dotfiles rm .config/thefuck/__pycache__/settings.cpython-313.pyc
```

- [ ] **Step 3: Remove on-disk junk**

```bash
rm -f /Users/pavlov/dotfiles/.DS_Store
rm -f /Users/pavlov/dotfiles/.config/btop/btop.log
rm -f /Users/pavlov/dotfiles/.config/htop/htoprc.tmp.*
rm -rf /Users/pavlov/dotfiles/.config/thefuck/__pycache__
```

- [ ] **Step 4: Commit**

```bash
cd /Users/pavlov/dotfiles
git commit -m "$(cat <<'EOF'
chore: stop tracking thefuck __pycache__

Python bytecode cache shouldn't be in the repo. Also wipe local-only
junk from disk (btop.log, htoprc tmp, .DS_Store) — they'll be
prevented from coming back by the next commit's .gitignore.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2.3: Harden `.gitignore`

**Files:**
- Modify: `/Users/pavlov/dotfiles/.gitignore`

- [ ] **Step 1: Write the new `.gitignore`**

Replace the entire file content (current content is just `.qodo`) with:
```
.qodo

# OS junk
.DS_Store

# Editor/runtime caches & logs
*.log
*.tmp.*
__pycache__/

# Per-machine secrets (real file is local, example is in repo)
dot_config/zsh/work.zsh
```

- [ ] **Step 2: Verify nothing tracked now matches**

Run: `git -C /Users/pavlov/dotfiles ls-files | git -C /Users/pavlov/dotfiles check-ignore --stdin 2>&1 | head`
Expected: empty output (no tracked file would be ignored).

- [ ] **Step 3: Commit**

```bash
cd /Users/pavlov/dotfiles
git add .gitignore
git commit -m "$(cat <<'EOF'
chore: tighten .gitignore for caches, logs, and per-machine secrets

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 3 — Restructure to chezmoi layout

### Task 3.1: Rename `.config/` → `dot_config/`

**Files:**
- Rename: `.config/**` → `dot_config/**`
- Delete: `.config/.zshrc` (was in wrong location; we'll re-introduce as `dot_zshrc.tmpl` in Task 3.3)

- [ ] **Step 1: Drop the misplaced `.zshrc`**

```bash
cd /Users/pavlov/dotfiles
git rm .config/.zshrc
```

- [ ] **Step 2: Rename the directory**

```bash
cd /Users/pavlov/dotfiles
git mv .config dot_config
```

This is one `git mv` of the whole tree. Git records all the individual renames.

- [ ] **Step 3: Verify**

Run:
```bash
ls /Users/pavlov/dotfiles/dot_config && [ ! -d /Users/pavlov/dotfiles/.config ] && echo OK
```
Expected: directory listing followed by `OK`.

- [ ] **Step 4: chezmoi dry-run sanity check**

Run: `chezmoi managed | head -10`
Expected: paths like `.config/bat/themes`, `.config/btop`, etc. (chezmoi translates `dot_config/` back to `.config/` on the destination side — exactly what we want.)

- [ ] **Step 5: Commit**

```bash
cd /Users/pavlov/dotfiles
git commit -m "$(cat <<'EOF'
refactor: move .config → dot_config (chezmoi naming convention)

Also drop the stale .config/.zshrc — the real .zshrc will live at
the repo root as dot_zshrc.tmpl in a follow-up commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3.2: Build `dot_zshrc.tmpl` and zsh modules from live `$HOME/.zshrc`

The live `~/.zshrc` is canonical. We split it into a thin top-level `.zshrc` template that sources four modules.

**Files:**
- Create: `/Users/pavlov/dotfiles/dot_zshrc.tmpl`
- Create: `/Users/pavlov/dotfiles/dot_config/zsh/aliases.zsh`
- Create: `/Users/pavlov/dotfiles/dot_config/zsh/functions.zsh`
- Create: `/Users/pavlov/dotfiles/dot_config/zsh/exports.zsh`
- Create: `/Users/pavlov/dotfiles/dot_config/zsh/path.zsh`
- Create: `/Users/pavlov/dotfiles/dot_config/zsh/work.zsh.example`

- [ ] **Step 1: Re-confirm live `.zshrc` is the truth**

Run: `diff /Users/pavlov/.zshrc /Users/pavlov/dotfiles/.config/.zshrc 2>/dev/null || diff /Users/pavlov/.zshrc /dev/null | head -5`

Skim the diff. The live file may have extras the snapshot lacks. We're going to ingest the LIVE file. (If the diff shows something you don't want, fix the live file first, then continue.)

- [ ] **Step 2: Write `dot_zshrc.tmpl`**

Content:
```sh
# Path to oh-my-zsh installation
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="murilasso"

plugins=(
	git
	asdf
	zsh-autosuggestions
	zsh-syntax-highlighting
	docker
	colorize
	colored-man-pages
	fasd
	tmux
	mongocli
)

source $ZSH/oh-my-zsh.sh

# Modular config — keep this file thin
for f in ~/.config/zsh/exports.zsh ~/.config/zsh/path.zsh ~/.config/zsh/aliases.zsh ~/.config/zsh/functions.zsh; do
  [ -r "$f" ] && source "$f"
done

# Per-machine secrets (not in git)
[ -r ~/.config/zsh/work.zsh ] && source ~/.config/zsh/work.zsh

{{ if eq .chezmoi.os "darwin" -}}
eval "$(/opt/homebrew/bin/brew shellenv)"
{{- end }}
```

- [ ] **Step 3: Write `dot_config/zsh/exports.zsh`**

Content:
```sh
export EDITOR=nvim
export BAT_THEME=vague

eval "$(fzf --zsh)"
eval $(thefuck --alias)
eval $(thefuck --alias FUCK)

if [ -n "${GHOSTTY_RESOURCES_DIR}" ]; then
  builtin source "${GHOSTTY_RESOURCES_DIR}/shell-integration/zsh/ghostty-integration"
fi
```

- [ ] **Step 4: Write `dot_config/zsh/path.zsh`**

Content:
```sh
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/.pyenv/bin:$PATH"

# pyenv (installed via brew or pacman/AUR on respective OSes)
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)" 2>/dev/null
fi

# .local/bin/env (uv etc.)
[ -r "$HOME/.local/bin/env" ] && . "$HOME/.local/bin/env"
```

- [ ] **Step 5: Write `dot_config/zsh/aliases.zsh`**

Content:
```sh
# find files like telescope
alias v="fd --type f --hidden --exclude .git | fzf-tmux -p --reverse | xargs nvim"

# bonsai while waiting
alias w8="cbonsai -i -l"

# eza-flavoured ls
alias ll="eza -l -g --icons"
alias ls="eza --color=always --icons=always --no-filesize --no-permissions --no-time --no-user"

# neovim everywhere
alias vim="nvim"
alias vi="nvim"

alias htop='htop -s PERCENT_MEM'
alias k9s='env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy -u no_proxy -u NO_PROXY k9s'
```

- [ ] **Step 6: Write `dot_config/zsh/functions.zsh`**

Content:
```sh
# Create or reattach to a tmux session named after the current directory
dev() {
  local dir_name=$(basename "$PWD")
  local session_name="$dir_name"

  if tmux has-session -t "$session_name" 2>/dev/null; then
    echo "Attaching to existing tmux session: $session_name"
    tmux switch-client -t "$session_name" 2>/dev/null || tmux attach-session -t "$session_name"
    tmux select-window -t "$session_name:1"
    return
  fi

  tmux new-session -d -s "$session_name" -n EDITOR
  tmux new-window -t "$session_name:" -n SHELL

  tmux select-window -t "$session_name:1"
  tmux attach-session -t "$session_name"
}
```

- [ ] **Step 7: Write `dot_config/zsh/work.zsh.example`**

Content:
```sh
# Copy to ~/.config/zsh/work.zsh and fill in. The example is committed; the
# real file is gitignored.

export OPENAI_BASE_URL=
export KUBECONFIG=
export proxy=

alias claude="HTTP_PROXY=$proxy HTTPS_PROXY=$proxy claude"
# alias gowork="${HOME}/Downloads/work/platform"
```

- [ ] **Step 8: Syntax-check the zsh modules**

Run:
```bash
zsh -n /Users/pavlov/dotfiles/dot_config/zsh/exports.zsh
zsh -n /Users/pavlov/dotfiles/dot_config/zsh/path.zsh
zsh -n /Users/pavlov/dotfiles/dot_config/zsh/aliases.zsh
zsh -n /Users/pavlov/dotfiles/dot_config/zsh/functions.zsh
zsh -n /Users/pavlov/dotfiles/dot_config/zsh/work.zsh.example
```
Expected: zero output, exit 0 each.

- [ ] **Step 9: Render `dot_zshrc.tmpl` and check the rendered file**

Run:
```bash
chezmoi cat ~/.zshrc | zsh -n
```
Expected: zero output, exit 0. (`chezmoi cat` renders the template; `zsh -n` parses without executing.)

- [ ] **Step 10: Commit**

```bash
cd /Users/pavlov/dotfiles
git add dot_zshrc.tmpl dot_config/zsh/
git commit -m "$(cat <<'EOF'
feat: split .zshrc into modular config + chezmoi template

dot_zshrc.tmpl is the thin top — it loads oh-my-zsh, sources modules
from ~/.config/zsh/, sources the local work.zsh if present, and ends
with a darwin-only brew shellenv.

Modules:
- exports.zsh: EDITOR/BAT_THEME, fzf, thefuck, ghostty shell integration
- path.zsh:    cargo/local/pyenv PATH + pyenv init
- aliases.zsh: v/w8/ll/ls/vim/htop/k9s
- functions.zsh: dev() tmux session helper
- work.zsh.example: template for per-machine secrets

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3.3: Convert `dot_config/ghostty/config` to a template

**Files:**
- Delete: `dot_config/ghostty/config`
- Create: `dot_config/ghostty/config.tmpl`

- [ ] **Step 1: Remove the old non-template file from index**

```bash
cd /Users/pavlov/dotfiles
git rm dot_config/ghostty/config
```

- [ ] **Step 2: Write `dot_config/ghostty/config.tmpl`**

Content:
```
# font-family = FiraCode Nerd Font
# font-family = Iosevka Nerd Font
# font-family = SFMono Nerd Font
font-family = JetBrainsMono Nerd Font
font-size = 13
theme = vague
shell-integration-features = no-cursor,sudo,no-title
cursor-style = block
adjust-cell-height = 35%
background-opacity = 0.90

mouse-hide-while-typing = true
mouse-scroll-multiplier = 2

window-padding-balance = true
window-save-state = always

{{ if eq .chezmoi.os "darwin" -}}
macos-titlebar-style = transparent
window-colorspace = "display-p3"

# keybindings (cmd-based on macOS)
keybind = cmd+s>r=reload_config
keybind = cmd+s>x=close_surface
keybind = cmd+s>n=new_window

# tabs
keybind = cmd+s>c=new_tab
keybind = cmd+s>shift+l=next_tab
keybind = cmd+s>shift+h=previous_tab
keybind = cmd+s>comma=move_tab:-1
keybind = cmd+s>period=move_tab:1

# quick tab switch
keybind = cmd+s>1=goto_tab:1
keybind = cmd+s>2=goto_tab:2
keybind = cmd+s>3=goto_tab:3
keybind = cmd+s>4=goto_tab:4
keybind = cmd+s>5=goto_tab:5
keybind = cmd+s>6=goto_tab:6
keybind = cmd+s>7=goto_tab:7
keybind = cmd+s>8=goto_tab:8
keybind = cmd+s>9=goto_tab:9

# split
keybind = cmd+s>\=new_split:right
keybind = cmd+s>-=new_split:down

keybind = cmd+s>j=goto_split:bottom
keybind = cmd+s>k=goto_split:top
keybind = cmd+s>h=goto_split:left
keybind = cmd+s>l=goto_split:right

keybind = cmd+s>z=toggle_split_zoom
keybind = cmd+s>e=equalize_splits
{{- else if eq .chezmoi.os "linux" -}}
# keybindings (ctrl-based on Linux; mirror of macOS map)
keybind = ctrl+s>r=reload_config
keybind = ctrl+s>x=close_surface
keybind = ctrl+s>n=new_window

# tabs
keybind = ctrl+s>c=new_tab
keybind = ctrl+s>shift+l=next_tab
keybind = ctrl+s>shift+h=previous_tab
keybind = ctrl+s>comma=move_tab:-1
keybind = ctrl+s>period=move_tab:1

# quick tab switch
keybind = ctrl+s>1=goto_tab:1
keybind = ctrl+s>2=goto_tab:2
keybind = ctrl+s>3=goto_tab:3
keybind = ctrl+s>4=goto_tab:4
keybind = ctrl+s>5=goto_tab:5
keybind = ctrl+s>6=goto_tab:6
keybind = ctrl+s>7=goto_tab:7
keybind = ctrl+s>8=goto_tab:8
keybind = ctrl+s>9=goto_tab:9

# split
keybind = ctrl+s>\=new_split:right
keybind = ctrl+s>-=new_split:down

keybind = ctrl+s>j=goto_split:bottom
keybind = ctrl+s>k=goto_split:top
keybind = ctrl+s>h=goto_split:left
keybind = ctrl+s>l=goto_split:right

keybind = ctrl+s>z=toggle_split_zoom
keybind = ctrl+s>e=equalize_splits
{{- end }}

# other
copy-on-select = clipboard
```

- [ ] **Step 3: Render and compare to current live ghostty config**

Run:
```bash
chezmoi cat ~/.config/ghostty/config > /tmp/ghostty-rendered
diff /tmp/ghostty-rendered ~/.config/ghostty/config | head -40
```
Expected: only differences should be whitespace and the commented `# foreground = d4be98` line, if any. Nothing semantically different on macOS. Skim the diff; if a real keybind is missing, add it.

- [ ] **Step 4: Commit**

```bash
cd /Users/pavlov/dotfiles
git add dot_config/ghostty/config.tmpl
git commit -m "$(cat <<'EOF'
feat(ghostty): template config for macOS (cmd+s) and Linux (ctrl+s)

Shared header + per-OS keybind block. macOS keeps macos-titlebar-style
and display-p3 colorspace; Linux uses ctrl+s as the leader since
there's no cmd key.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 4 — chezmoi ignore + bootstrap scripts

### Task 4.1: Add `.chezmoiignore`

**Files:**
- Create: `/Users/pavlov/dotfiles/.chezmoiignore`

- [ ] **Step 1: Write `.chezmoiignore`**

Content:
```
README.md
LICENSE
assets/
packages/
docs/

{{ if ne .chezmoi.os "linux" -}}
.config/hypr
{{- end }}
```

- [ ] **Step 2: Verify chezmoi no longer "manages" the ignored paths**

Run: `chezmoi managed | grep -E '^(README|LICENSE|assets|packages|docs)' || echo "GOOD: nothing leaks"`
Expected: prints `GOOD: nothing leaks`.

- [ ] **Step 3: Commit**

```bash
cd /Users/pavlov/dotfiles
git add .chezmoiignore
git commit -m "$(cat <<'EOF'
chore: add .chezmoiignore for docs/assets/packages and non-Linux hypr

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4.2: Add oh-my-zsh installer script

**Files:**
- Create: `/Users/pavlov/dotfiles/run_once_before_10-install-omz.sh.tmpl`

- [ ] **Step 1: Write the script**

Content:
```sh
#!/bin/sh
set -eu

if [ ! -d "$HOME/.oh-my-zsh" ]; then
  echo "Installing oh-my-zsh..."
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended --keep-zshrc
fi
```

- [ ] **Step 2: Verify chezmoi parses the template**

Run: `chezmoi execute-template < /Users/pavlov/dotfiles/run_once_before_10-install-omz.sh.tmpl | head -3`
Expected: prints the shebang line and a blank/`set -eu` line. No template errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/pavlov/dotfiles
git add run_once_before_10-install-omz.sh.tmpl
git commit -m "$(cat <<'EOF'
feat: bootstrap script to install oh-my-zsh on first apply

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4.3: Add oh-my-zsh plugins installer script

**Files:**
- Create: `/Users/pavlov/dotfiles/run_once_before_20-install-omz-plugins.sh.tmpl`

- [ ] **Step 1: Write the script**

Content:
```sh
#!/bin/sh
set -eu

ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"

if [ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]; then
  git clone https://github.com/zsh-users/zsh-autosuggestions \
    "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
fi

if [ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
    "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
fi
```

- [ ] **Step 2: Verify it parses**

Run: `chezmoi execute-template < /Users/pavlov/dotfiles/run_once_before_20-install-omz-plugins.sh.tmpl | tail -5`
Expected: prints the last block of the script intact.

- [ ] **Step 3: Commit**

```bash
cd /Users/pavlov/dotfiles
git add run_once_before_20-install-omz-plugins.sh.tmpl
git commit -m "$(cat <<'EOF'
feat: bootstrap script to install zsh-autosuggestions + syntax-highlighting

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4.4: Add package installer script

**Files:**
- Create: `/Users/pavlov/dotfiles/run_onchange_30-install-packages.sh.tmpl`

- [ ] **Step 1: Write the script**

Content:
```sh
#!/bin/sh
# packages hash: {{ include "packages/Brewfile" | sha256sum }} {{ include "packages/arch-pacman.txt" | sha256sum }} {{ include "packages/arch-aur.txt" | sha256sum }}
set -eu

{{ if eq .chezmoi.os "darwin" -}}
if ! command -v brew >/dev/null 2>&1; then
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew bundle --file="{{ .chezmoi.sourceDir }}/packages/Brewfile"

{{- else if eq .chezmoi.os "linux" -}}
if [ -r /etc/arch-release ]; then
  PACMAN_LIST="{{ .chezmoi.sourceDir }}/packages/arch-pacman.txt"
  AUR_LIST="{{ .chezmoi.sourceDir }}/packages/arch-aur.txt"

  sudo pacman -Syu --needed --noconfirm $(grep -Ev '^(#|$)' "$PACMAN_LIST")

  if ! command -v paru >/dev/null 2>&1; then
    sudo pacman -S --needed --noconfirm base-devel git
    TMPDIR=$(mktemp -d)
    git clone https://aur.archlinux.org/paru.git "$TMPDIR/paru"
    ( cd "$TMPDIR/paru" && makepkg -si --noconfirm )
    rm -rf "$TMPDIR"
  fi

  paru -S --needed --noconfirm $(grep -Ev '^(#|$)' "$AUR_LIST")
else
  echo "Non-Arch Linux: skipping package install"
fi
{{- end }}
```

- [ ] **Step 2: Verify the template renders (packages files don't exist yet — `include` will fail; create stubs first)**

Run:
```bash
mkdir -p /Users/pavlov/dotfiles/packages
touch /Users/pavlov/dotfiles/packages/Brewfile \
      /Users/pavlov/dotfiles/packages/arch-pacman.txt \
      /Users/pavlov/dotfiles/packages/arch-aur.txt
chezmoi execute-template < /Users/pavlov/dotfiles/run_onchange_30-install-packages.sh.tmpl | head -5
```
Expected: prints the shebang and a hash-comment line containing three sha256 hashes. (Stubs are zero-byte, so all three hashes will be `e3b0c44...` — that's fine, it's a real hash of empty content.)

- [ ] **Step 3: Commit (the script + the empty stubs together)**

```bash
cd /Users/pavlov/dotfiles
git add run_onchange_30-install-packages.sh.tmpl \
        packages/Brewfile packages/arch-pacman.txt packages/arch-aur.txt
git commit -m "$(cat <<'EOF'
feat: package-install run_onchange script with manifest hash trigger

The hash comment makes chezmoi re-run this script whenever any
manifest changes. macOS branch uses brew bundle; Linux branch
checks /etc/arch-release, installs pacman packages, ensures paru
exists, then installs AUR packages.

Manifest files start empty and get filled in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 5 — Package manifests

### Task 5.1: Fill `packages/Brewfile`

**Files:**
- Modify: `/Users/pavlov/dotfiles/packages/Brewfile`

- [ ] **Step 1: Dump current brew state**

Run: `brew bundle dump --file=/tmp/Brewfile-current --force && wc -l /tmp/Brewfile-current`
Expected: dumps to `/tmp/Brewfile-current`, line count printed.

- [ ] **Step 2: Inspect the dump**

Run: `head -200 /tmp/Brewfile-current`

Skim it. We want the minimal set actually referenced from configs and aliases. Compare against this canonical list:

**Required formulae:** `neovim`, `tmux`, `fzf`, `fd`, `bat`, `eza`, `btop`, `htop`, `ripgrep`, `thefuck`, `pyenv`, `pyenv-virtualenv`, `asdf`, `k9s`, `cbonsai`.

**Required casks:** `ghostty`.

**Required taps:** none of these are tap-required as of late 2025 in mainline Homebrew, but `brew bundle dump` may include taps. Keep `tap "..."` only if `brew info <formula>` shows it's required.

- [ ] **Step 3: Write the curated Brewfile**

Replace `/Users/pavlov/dotfiles/packages/Brewfile` with:
```ruby
# Curated Brewfile — only what dotfiles depend on. Other tools belong elsewhere.

brew "asdf"
brew "bat"
brew "btop"
brew "cbonsai"
brew "eza"
brew "fd"
brew "fzf"
brew "htop"
brew "k9s"
brew "neovim"
brew "pyenv"
brew "pyenv-virtualenv"
brew "ripgrep"
brew "thefuck"
brew "tmux"

cask "ghostty"
```

- [ ] **Step 4: Dry-run validate**

Run: `brew bundle check --file=/Users/pavlov/dotfiles/packages/Brewfile`
Expected: prints `The Brewfile's dependencies are satisfied.` (If anything's missing — e.g. `cbonsai` isn't on your machine — that's fine for the macOS host; the Brewfile is correct for fresh installs. The check will fail loud and you'll see exactly what.)

- [ ] **Step 5: Commit**

```bash
cd /Users/pavlov/dotfiles
git add packages/Brewfile
git commit -m "$(cat <<'EOF'
feat(packages): curated Brewfile for macOS bootstrap

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5.2: Fill `packages/arch-pacman.txt`

**Files:**
- Modify: `/Users/pavlov/dotfiles/packages/arch-pacman.txt`

- [ ] **Step 1: Write the file**

Content:
```
# Arch packages from the official repos. One per line. Comments and blanks OK.

base-devel
git
zsh
neovim
tmux
fzf
fd
bat
eza
btop
htop
ripgrep
thefuck
pyenv
k9s
zsh-autosuggestions
zsh-syntax-highlighting
```

- [ ] **Step 2: Commit**

```bash
cd /Users/pavlov/dotfiles
git add packages/arch-pacman.txt
git commit -m "$(cat <<'EOF'
feat(packages): arch pacman manifest

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5.3: Fill `packages/arch-aur.txt`

**Files:**
- Modify: `/Users/pavlov/dotfiles/packages/arch-aur.txt`

- [ ] **Step 1: Write the file**

Content:
```
# AUR packages (installed via paru). One per line.

ghostty
cbonsai
pyenv-virtualenv
asdf-vm
```

- [ ] **Step 2: Commit**

```bash
cd /Users/pavlov/dotfiles
git add packages/arch-aur.txt
git commit -m "$(cat <<'EOF'
feat(packages): arch AUR manifest

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 6 — Wallpapers extraction

### ⚠️ Risk gate

This phase creates a new GitHub repo under your account and pushes content there. **Before starting, confirm with the user:**
> "I'm about to create a public GitHub repo `eyeonyou/wallpapers`, push the wallpaper files to it, then remove `wallpapers/` from `eyeonyou/dotfiles`. OK to proceed?"

Wait for explicit confirmation before continuing.

### Task 6.1: Create new wallpapers repo and push files

**Files:**
- Delete from dotfiles: `wallpapers/*` (4 PNG/JPG files)
- New external repo: `eyeonyou/wallpapers` (created with `gh repo create`)

- [ ] **Step 1: Prepare a fresh directory for the new repo**

```bash
mkdir -p /tmp/wallpapers-new && cd /tmp/wallpapers-new
git init -b main
cp /Users/pavlov/dotfiles/wallpapers/*.png /Users/pavlov/dotfiles/wallpapers/*.jpg . 2>/dev/null
ls -la
```
Expected: lists 4 image files plus `.git/`.

- [ ] **Step 2: Initial commit**

```bash
cd /tmp/wallpapers-new
cat > README.md <<'EOF'
# wallpapers

My desktop wallpapers. Extracted from dotfiles so the dotfiles repo doesn't carry binary blobs.
EOF
git add -A
git commit -m "Initial commit"
```

- [ ] **Step 3: Create the GitHub repo and push**

```bash
cd /tmp/wallpapers-new
gh repo create eyeonyou/wallpapers --public --source=. --remote=origin --push
```
Expected: prints `✓ Created repository eyeonyou/wallpapers on GitHub` and pushes the commit.

- [ ] **Step 4: Verify**

```bash
gh repo view eyeonyou/wallpapers --json url --jq .url
```
Expected: prints `https://github.com/eyeonyou/wallpapers`.

---

### Task 6.2: Remove `wallpapers/` from dotfiles

**Files:**
- Delete: `/Users/pavlov/dotfiles/wallpapers/`

- [ ] **Step 1: Remove from index and disk**

```bash
cd /Users/pavlov/dotfiles
git rm -r wallpapers/
```

- [ ] **Step 2: Verify**

```bash
ls /Users/pavlov/dotfiles/wallpapers 2>&1
```
Expected: `No such file or directory`.

- [ ] **Step 3: Commit**

```bash
cd /Users/pavlov/dotfiles
git commit -m "$(cat <<'EOF'
chore: move wallpapers to dedicated repo eyeonyou/wallpapers

The dotfiles repo shouldn't ship 10 MB of images. See:
https://github.com/eyeonyou/wallpapers

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 7 — Verification (still local, still on macOS)

### Task 7.1: Render every template, check for errors

**Files:** none (read-only checks)

- [ ] **Step 1: Verify chezmoi sees all expected sources**

Run: `chezmoi managed | sort`

Expected: a list including `.zshrc`, `.config/ghostty/config`, `.config/zsh/aliases.zsh`, `.config/zsh/exports.zsh`, `.config/zsh/functions.zsh`, `.config/zsh/path.zsh`, `.config/zsh/work.zsh.example`, plus `.config/nvim/...`, `.config/tmux/tmux.conf`, etc. No paths in `assets/`, `packages/`, `docs/`.

- [ ] **Step 2: Render the zshrc and parse it**

Run: `chezmoi cat ~/.zshrc | zsh -n /dev/stdin && echo OK`
Expected: prints `OK`.

- [ ] **Step 3: Render the ghostty config and sanity-check**

Run: `chezmoi cat ~/.config/ghostty/config | grep -c '^keybind = cmd+s>'`
Expected: prints a number ≥ 25 (we have ~28 cmd+s keybinds). If 0, templating broke.

---

### Task 7.2: Apply to a scratch home dir (non-destructive)

**Files:** none (writes only to `/tmp/scratch-home`)

- [ ] **Step 1: Apply to a throwaway destination**

Run:
```bash
rm -rf /tmp/scratch-home
mkdir -p /tmp/scratch-home
chezmoi apply --destination /tmp/scratch-home --no-tty --force \
              --exclude scripts 2>&1 | tail -20
```

`--exclude scripts` skips the `run_*` bootstrap scripts so we don't actually install Homebrew/oh-my-zsh into the scratch dir.

Expected: exit 0. The trailing output should look benign (file creation messages, no errors).

- [ ] **Step 2: Inspect what landed**

Run:
```bash
find /tmp/scratch-home -maxdepth 3 -type f | sort | head -30
```
Expected: includes `/tmp/scratch-home/.zshrc`, `/tmp/scratch-home/.config/ghostty/config`, `/tmp/scratch-home/.config/zsh/aliases.zsh`, etc.

- [ ] **Step 3: Compare scratch render vs current live `$HOME`**

Run:
```bash
diff -r --brief /tmp/scratch-home/.config "$HOME/.config" 2>&1 | grep -vE 'coc|Code|google-chrome|configstore|raycast|Granola|claude|node_modules|chezmoi|gh|nvim/.*lazy-lock|.DS_Store' | head -30
```

This compares everything chezmoi would write under `~/.config` against the live one, filtering out directories chezmoi doesn't manage. Expected: short list, mostly "Only in $HOME/.config: <something>" lines for stuff chezmoi doesn't manage. No "differ" lines for managed files. If there's a "differ" line on a managed file, investigate — it means the template diverged from live state.

- [ ] **Step 4: Compare scratch `.zshrc` vs live**

Run: `diff /tmp/scratch-home/.zshrc "$HOME/.zshrc"`
Expected: differences should be ONLY the structural ones we introduced (the modular `source` loop replaces a flat dump of lines). The behavior loaded should be equivalent. Skim the diff manually and confirm.

---

### ⚠️ Risk gate before Task 7.3

Task 7.3 is the first time chezmoi modifies the live `$HOME`. **Before starting, confirm with the user:**
> "Verification against a scratch home looks clean. About to point chezmoi at the real `$HOME` and run `chezmoi diff` (read-only, no changes yet). Then on your OK, `chezmoi apply` for real. Proceed?"

Wait for confirmation.

### Task 7.3: Dry-run against live `$HOME`, then apply for real

**Files:** modifies files in `$HOME` directly (`.zshrc`, `.config/...`)

- [ ] **Step 1: chezmoi diff against live home**

Run: `chezmoi diff 2>&1 | head -100`

Read the diff. Expected: the only material differences are the structural change to `.zshrc` (it becomes thin + sources modules) and possibly cosmetic whitespace in ghostty config. No content loss.

- [ ] **Step 2: If diff looks wrong, STOP** and report to the user what's unexpected.

- [ ] **Step 3: Stash existing zsh modules dir if any (it shouldn't exist yet)**

Run:
```bash
[ -d ~/.config/zsh ] && mv ~/.config/zsh ~/.config/zsh.pre-chezmoi.$(date +%s)
echo "moved if existed"
```

- [ ] **Step 4: Apply for real**

Run: `chezmoi apply --no-tty 2>&1 | tail -30`
Expected: exit 0. Files created/updated in `$HOME`.

Note: this WILL run the `run_once_before_*` bootstrap scripts (oh-my-zsh + plugins install) since they've never run before. If oh-my-zsh is already installed they skip. The `run_onchange_30-install-packages.sh` will run `brew bundle` — it should be a no-op or close to it since these packages are already installed.

- [ ] **Step 5: Set up local work.zsh**

Open a new terminal or `exec zsh`. If you have work secrets you want available:
```bash
cp ~/.config/zsh/work.zsh.example ~/.config/zsh/work.zsh
$EDITOR ~/.config/zsh/work.zsh
```

Fill in `OPENAI_BASE_URL`, `KUBECONFIG`, `proxy` from your prior live `.zshrc`. (Pull from the backup tarball if needed.)

- [ ] **Step 6: Smoke test the new shell**

Open a fresh zsh:
```bash
exec zsh -l
```
Expected: shell starts without errors, prompt theme renders, `alias ls`/`vim`/`htop` work, `dev` function defined (try `type dev` — should print the function body).

- [ ] **Step 7: Verify oh-my-zsh plugins loaded**

In the new shell, try `<TAB>` after a partial command — autosuggestion should appear. Run `echo $ZSH_VERSION`. Expected: a version string.

- [ ] **Step 8: No commit** (this task changed `$HOME`, not the repo)

---

## Phase 8 — README and final commit

### Task 8.1: Rewrite README.md

**Files:**
- Modify: `/Users/pavlov/dotfiles/README.md`

- [ ] **Step 1: Write the new README**

Replace `/Users/pavlov/dotfiles/README.md` with:

````markdown
# dotfiles

My personal dotfiles, managed with [chezmoi](https://www.chezmoi.io/).

Tested on:
- **macOS** (Sonoma+)
- **Arch Linux** (Hyprland + sddm)

## Install on a new machine

### Prereqs
- Install [chezmoi](https://www.chezmoi.io/install/):
  - macOS: `brew install chezmoi`
  - Arch: `sudo pacman -S chezmoi`

### Bootstrap
```sh
chezmoi init --apply git@github.com:eyeonyou/dotfiles.git
```

This will:
1. Clone the repo into `~/.local/share/chezmoi`.
2. Run `run_once_before_*` scripts to install oh-my-zsh and its plugins.
3. Render templates and write your `~/.zshrc`, `~/.config/...` files.
4. Run `run_onchange_30-install-packages.sh` to install the packages from the manifest (`Brewfile` on macOS, `pacman` + AUR via `paru` on Arch).

After it finishes, copy and fill in the secrets template:
```sh
cp ~/.config/zsh/work.zsh.example ~/.config/zsh/work.zsh
$EDITOR ~/.config/zsh/work.zsh
```

Open a new terminal and you're done.

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
│   ├── nvim/                   # LazyVim
│   ├── tmux/tmux.conf
│   ├── ghostty/config.tmpl     # OS-templated (cmd+s on macOS, ctrl+s on Linux)
│   ├── bat/, btop/, eza/, htop/, posting/
│   └── hypr/                   # Hyprland — populated on Arch
├── packages/
│   ├── Brewfile
│   ├── arch-pacman.txt
│   └── arch-aur.txt
├── run_once_before_10-install-omz.sh.tmpl
├── run_once_before_20-install-omz-plugins.sh.tmpl
├── run_onchange_30-install-packages.sh.tmpl
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

Don't commit them. `~/.config/zsh/work.zsh` is gitignored. The example file (`work.zsh.example`) is committed as a template.

## Wallpapers

Live in their own repo: https://github.com/eyeonyou/wallpapers

## nvim keys (LazyVim)

- `gd` — go to definition
- `gr` — go to references
- `gc` — toggle comment (visual)
- `<space><space>` — telescope find file
- `<space>/` — telescope grep
````

- [ ] **Step 2: Commit**

```bash
cd /Users/pavlov/dotfiles
git add README.md
git commit -m "$(cat <<'EOF'
docs: rewrite README for chezmoi-based workflow

Cover install on macOS and Arch, layout, adding new configs, and where
secrets live.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 9 — Push to GitHub

### ⚠️ Risk gate

This makes everything visible on github.com/eyeonyou/dotfiles. **Before starting, confirm with the user:**
> "Everything's committed locally. About to `git push origin master`. Pushes will include all phase-1-through-8 commits. Proceed?"

Wait for confirmation.

### Task 9.1: Push

- [ ] **Step 1: Final sanity check**

```bash
cd /Users/pavlov/dotfiles
git log --oneline master ^origin/master
```
Expected: lists all the commits made by this plan (Phase 1 through 8). Skim them.

- [ ] **Step 2: Push**

```bash
cd /Users/pavlov/dotfiles
git push origin master
```
Expected: standard `Writing objects` / `To github.com:eyeonyou/dotfiles.git` output. No force-push.

- [ ] **Step 3: Verify on GitHub**

```bash
gh repo view eyeonyou/dotfiles --json defaultBranchRef --jq .defaultBranchRef.name
gh api repos/eyeonyou/dotfiles/commits/master --jq .commit.message | head -3
```
Expected: branch name `master`, and the latest commit message matches the README commit.

---

## Done.

What this plan does NOT do (intentionally — out of scope per spec §9):
- Hyprland / sddm configs — will come in a follow-up spec once the Arch box has CLI parity.
- Migration away from oh-my-zsh to a leaner framework.
- Encrypted secrets via age/gpg.
- CI for `chezmoi apply` in a docker container.

Next concrete step after this plan finishes: log into the new Arch box and run `chezmoi init --apply git@github.com:eyeonyou/dotfiles.git`.
