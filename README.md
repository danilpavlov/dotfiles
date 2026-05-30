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

Live in their own repo: https://github.com/danilpavlov/wallpapers

## nvim keys (LazyVim)

- `gd` — go to definition
- `gr` — go to references
- `gc` — toggle comment (visual)
- `<space><space>` — telescope find file
- `<space>/` — telescope grep
