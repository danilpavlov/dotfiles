# Dotfiles: macOS + Arch via chezmoi — Design

**Date:** 2026-05-30
**Author:** Daniil Pavlov
**Status:** Approved, awaiting implementation plan

## 1. Цель

Привести репозиторий `~/dotfiles` в состояние, в котором он:

1. Разворачивается одной командой на macOS и на новом Arch Linux ПК (Hyprland + sddm).
2. Разделяет OS-специфичные части корректно (без ручных правок после `git pull`).
3. Не тащит за собой сторонние фреймворки (oh-my-zsh, gpakosz/.tmux) как vendored-копии — они ставятся как пакеты или сторонние установщики.
4. Хранит рабочие секреты (внутренние URL, KUBECONFIG, proxy) вне публичного репо.
5. Знает какие пакеты нужны на каждой OS (Brewfile + pacman/AUR списки).

Hyprland-конфиги и прочее специфичное для Arch — **вне скоупа этого спека**. Дополним их отдельным циклом после того как новый ПК заработает с CLI-окружением, идентичным macOS.

## 2. Технологический выбор

| Решение | Выбор | Обоснование |
|---|---|---|
| Менеджер dotfiles | **chezmoi** | Нативные шаблоны Go по `chezmoi.os`/`hostname`, поддержка приватных/encrypted файлов, run-скриптов, кросс-платформенно. |
| Способ OS-разделения | **Гибрид** (шаблоны для мелких различий + отдельные ветки внутри одного шаблона для крупных) | Минимум дублирования; читаемо. |
| Управление пакетами | `Brewfile` + `arch-pacman.txt` + `arch-aur.txt` | Явно, без обвязки. AUR через `paru`. |
| Секреты | Локальный файл `~/.config/zsh/work.zsh`, не в git, источится из `.zshrc` если существует. Пример лежит в репо. | Просто; не требует ключей шифрования на каждой машине. |
| Wallpapers | Выносятся в отдельный репо `eyeonyou/wallpapers` | Не относится к конфигам, занимает место. |

## 3. Структура репозитория

```
~/dotfiles/                           # = ~/.local/share/chezmoi (через symlink или init)
├── .chezmoiroot                      # пусто (источник = корень репо)
├── .chezmoiignore                    # OS-условные исключения, плюс не-конфиги
├── .chezmoidata.yaml                 # name/email/editor
├── .gitignore
│
├── README.md                         # установка на macOS/Arch, обзор структуры
├── LICENSE
│
├── dot_zshrc.tmpl                    # → ~/.zshrc
│
├── dot_config/                       # → ~/.config/
│   ├── zsh/
│   │   ├── aliases.zsh               # общие алиасы
│   │   ├── functions.zsh             # dev() и т.п.
│   │   ├── exports.zsh               # EDITOR, BAT_THEME, прочие envs
│   │   ├── path.zsh                  # PATH (cargo/pyenv/local — общий)
│   │   └── work.zsh.example          # шаблон приватного файла (в git)
│   │
│   ├── nvim/                         # LazyVim, общий (как сейчас)
│   ├── tmux/tmux.conf                # общий (как сейчас)
│   ├── ghostty/
│   │   ├── config.tmpl               # OS-ветки внутри
│   │   └── themes/                   # общие
│   ├── bat/themes/                   # общие
│   ├── btop/
│   │   ├── btop.conf                 # без логов
│   │   └── themes/
│   ├── eza/theme.yml
│   ├── htop/htoprc                   # без .tmp
│   ├── posting/config.yaml
│   └── hypr/                         # заполнится позже на Arch
│
├── packages/
│   ├── Brewfile
│   ├── arch-pacman.txt
│   └── arch-aur.txt
│
├── run_once_before_10-install-omz.sh.tmpl
├── run_once_before_20-install-omz-plugins.sh.tmpl
├── run_onchange_30-install-packages.sh.tmpl
│
├── assets/                           # картинки для README
└── docs/                             # этот файл и будущие спеки/планы
```

### Соглашения chezmoi, используемые здесь

| Префикс/суффикс | Эффект |
|---|---|
| `dot_<name>` | разворачивается как `.<name>` |
| `private_<name>` | устанавливает `chmod 0700` (зарезервировано, пока не используется) |
| `*.tmpl` | Go template, рендерится в файл без суффикса `.tmpl` |
| `run_once_before_*` | выполняется один раз ДО раскладки файлов |
| `run_onchange_*` | перезапускается при изменении содержимого скрипта (вкл. встроенный хэш манифестов) |

### Удаляется из репо

| Путь | Причина |
|---|---|
| `.oh-my-zsh/` | Фреймворк, ставится curl-скриптом |
| `.tmux/` | gpakosz/.tmux не используется (есть свой `tmux.conf`) |
| `.zsh/zsh-autosuggestions/` | Ставится как пакет / в `$ZSH_CUSTOM/plugins` |
| `.config/.zshrc` | Лежит в неверном месте; правильный `.zshrc` теперь в корне как `dot_zshrc.tmpl` |
| `.config/thefuck/__pycache__/` | Кэш Python |
| `.config/htop/htoprc.tmp.*` | Временный файл htop |
| `.config/btop/btop.log` | Лог-файл |
| `.DS_Store` | Артефакт macOS Finder |
| `wallpapers/` | Перенос в отдельный репо |

### Добавляется в `.gitignore`

```
*.log
*.tmp.*
__pycache__/
.DS_Store
dot_config/zsh/work.zsh
```

(Опционально оставляем `dot_config/nvim/lazy-lock.json` — закрепляет версии плагинов; это даёт воспроизводимость и его обычно коммитят.)

## 4. Шаблоны и содержимое

### 4.1 `.chezmoidata.yaml`

```yaml
name: Daniil Pavlov
email: daniil1pavlov1@gmail.com
editor: nvim
```

### 4.2 `dot_zshrc.tmpl`

Тонкий слой, который грузит oh-my-zsh и source-ит модули. Без OS-логики кроме одного блока в конце.

```sh
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="murilasso"
plugins=(git asdf zsh-autosuggestions zsh-syntax-highlighting docker
         colorize colored-man-pages fasd tmux mongocli)
source $ZSH/oh-my-zsh.sh

for f in ~/.config/zsh/{exports,path,aliases,functions}.zsh; do
  [ -r "$f" ] && source "$f"
done

[ -r ~/.config/zsh/work.zsh ] && source ~/.config/zsh/work.zsh

{{ if eq .chezmoi.os "darwin" -}}
eval "$(/opt/homebrew/bin/brew shellenv)"
{{- end }}
```

### 4.3 `dot_config/zsh/exports.zsh`

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

### 4.4 `dot_config/zsh/path.zsh`

PATH-блок общий для обоих OS — pyenv ставится и там и там. Homebrew-shellenv для macOS живёт в хвосте `.zshrc.tmpl` (§4.2).

```sh
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

### 4.5 `dot_config/zsh/aliases.zsh` (общий, без шаблона)

```sh
alias v="fd --type f --hidden --exclude .git | fzf-tmux -p --reverse | xargs nvim"
alias w8="cbonsai -i -l"
alias ll="eza -l -g --icons"
alias ls="eza --color=always --icons=always --no-filesize --no-permissions --no-time --no-user"
alias vim="nvim"
alias vi="nvim"
alias htop='htop -s PERCENT_MEM'
alias k9s='env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy -u no_proxy -u NO_PROXY k9s'
```

### 4.6 `dot_config/zsh/functions.zsh` (общий)

`dev()` (создание/переключение tmux-сессии), и любые другие функции, добавляемые позже.

### 4.7 `dot_config/zsh/work.zsh.example`

```sh
# Скопируй в ~/.config/zsh/work.zsh и заполни. Этот пример коммитим, реальный файл — нет.
export OPENAI_BASE_URL=
export KUBECONFIG=
export proxy=
alias claude="HTTP_PROXY=$proxy HTTPS_PROXY=$proxy claude"
# alias gowork="${HOME}/Downloads/work/platform"
```

### 4.8 `dot_config/ghostty/config.tmpl`

Шапка общая, биндинги per-OS целыми ветками.

```
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

keybind = cmd+s>r=reload_config
keybind = cmd+s>x=close_surface
keybind = cmd+s>n=new_window
keybind = cmd+s>c=new_tab
keybind = cmd+s>shift+l=next_tab
keybind = cmd+s>shift+h=previous_tab
keybind = cmd+s>comma=move_tab:-1
keybind = cmd+s>period=move_tab:1
keybind = cmd+s>1=goto_tab:1
keybind = cmd+s>2=goto_tab:2
keybind = cmd+s>3=goto_tab:3
keybind = cmd+s>4=goto_tab:4
keybind = cmd+s>5=goto_tab:5
keybind = cmd+s>6=goto_tab:6
keybind = cmd+s>7=goto_tab:7
keybind = cmd+s>8=goto_tab:8
keybind = cmd+s>9=goto_tab:9
keybind = cmd+s>\=new_split:right
keybind = cmd+s>-=new_split:down
keybind = cmd+s>j=goto_split:bottom
keybind = cmd+s>k=goto_split:top
keybind = cmd+s>h=goto_split:left
keybind = cmd+s>l=goto_split:right
keybind = cmd+s>z=toggle_split_zoom
keybind = cmd+s>e=equalize_splits
{{- else if eq .chezmoi.os "linux" -}}
keybind = ctrl+s>r=reload_config
keybind = ctrl+s>x=close_surface
keybind = ctrl+s>n=new_window
keybind = ctrl+s>c=new_tab
keybind = ctrl+s>shift+l=next_tab
keybind = ctrl+s>shift+h=previous_tab
keybind = ctrl+s>comma=move_tab:-1
keybind = ctrl+s>period=move_tab:1
keybind = ctrl+s>1=goto_tab:1
keybind = ctrl+s>2=goto_tab:2
keybind = ctrl+s>3=goto_tab:3
keybind = ctrl+s>4=goto_tab:4
keybind = ctrl+s>5=goto_tab:5
keybind = ctrl+s>6=goto_tab:6
keybind = ctrl+s>7=goto_tab:7
keybind = ctrl+s>8=goto_tab:8
keybind = ctrl+s>9=goto_tab:9
keybind = ctrl+s>\=new_split:right
keybind = ctrl+s>-=new_split:down
keybind = ctrl+s>j=goto_split:bottom
keybind = ctrl+s>k=goto_split:top
keybind = ctrl+s>h=goto_split:left
keybind = ctrl+s>l=goto_split:right
keybind = ctrl+s>z=toggle_split_zoom
keybind = ctrl+s>e=equalize_splits
{{- end }}

copy-on-select = clipboard
```

### 4.9 `.chezmoiignore`

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

## 5. Bootstrap-скрипты

### 5.1 `run_once_before_10-install-omz.sh.tmpl`

```sh
#!/bin/sh
set -eu
if [ ! -d "$HOME/.oh-my-zsh" ]; then
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended --keep-zshrc
fi
```

### 5.2 `run_once_before_20-install-omz-plugins.sh.tmpl`

```sh
#!/bin/sh
set -eu
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
[ -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ] || \
  git clone https://github.com/zsh-users/zsh-autosuggestions "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
[ -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ] || \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
```

### 5.3 `run_onchange_30-install-packages.sh.tmpl`

```sh
#!/bin/sh
# packages hash: {{ include "packages/Brewfile" | sha256sum }}{{ include "packages/arch-pacman.txt" | sha256sum }}{{ include "packages/arch-aur.txt" | sha256sum }}
set -eu

{{ if eq .chezmoi.os "darwin" -}}
if ! command -v brew >/dev/null 2>&1; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
brew bundle --file="{{ .chezmoi.sourceDir }}/packages/Brewfile"

{{- else if eq .chezmoi.os "linux" -}}
sudo pacman -Syu --needed --noconfirm $(grep -v '^#' "{{ .chezmoi.sourceDir }}/packages/arch-pacman.txt")

if ! command -v paru >/dev/null 2>&1; then
  sudo pacman -S --needed --noconfirm base-devel git
  TMP=$(mktemp -d)
  git clone https://aur.archlinux.org/paru.git "$TMP/paru"
  (cd "$TMP/paru" && makepkg -si --noconfirm)
  rm -rf "$TMP"
fi
paru -S --needed --noconfirm $(grep -v '^#' "{{ .chezmoi.sourceDir }}/packages/arch-aur.txt")
{{- end }}
```

Хэш-комментарий заставляет chezmoi считать скрипт «изменённым» когда меняются манифесты, и перезапустить его.

## 6. Манифесты пакетов

### 6.1 `packages/Brewfile`

```ruby
brew "neovim"
brew "tmux"
brew "fzf"
brew "fd"
brew "bat"
brew "eza"
brew "btop"
brew "htop"
brew "ripgrep"
brew "thefuck"
brew "pyenv"
brew "pyenv-virtualenv"
brew "asdf"
brew "k9s"
brew "cbonsai"
cask "ghostty"
```

Точный финальный список получим через `brew bundle dump` и руками отфильтруем оставив только то что реально используем.

### 6.2 `packages/arch-pacman.txt`

```
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
zsh
zsh-autosuggestions
zsh-syntax-highlighting
git
base-devel
```

### 6.3 `packages/arch-aur.txt`

```
ghostty
cbonsai
pyenv-virtualenv
asdf-vm
```

Окончательные имена пакетов проверим перед коммитом — у пары пунктов на Arch могут отличаться имена.

## 7. План миграции

Делаем серией коммитов поверх `master`, не переписывая историю.

1. **Чистка.** Удалить vendored-фреймворки и мусор (список в §3). Обновить `.gitignore`.
2. **Реструктуризация.** Переименовать `.config/` → `dot_config/`. Перенести `.config/.zshrc` → корень как `dot_zshrc.tmpl`. Разнести его на модули (`exports`, `path`, `aliases`, `functions`, `work.zsh.example`).
3. **Шаблоны.** Добавить OS-блоки в `dot_zshrc.tmpl`, `path.zsh.tmpl`, `dot_config/ghostty/config.tmpl`.
4. **Обои.** Создать репо `eyeonyou/wallpapers` через `gh repo create`, перенести `wallpapers/`, удалить из dotfiles, оставить ссылку в README.
5. **Манифесты.** Создать `packages/Brewfile`, `arch-pacman.txt`, `arch-aur.txt` (Brewfile — через `brew bundle dump` + ручной фильтр).
6. **Bootstrap.** Положить три `run_*` скрипта.
7. **chezmoi-метаданные.** `.chezmoiroot`, `.chezmoiignore`, `.chezmoidata.yaml`.
8. **Проверка на macOS.** `chezmoi init --apply --source=$PWD` в скретч-директорию. `chezmoi diff` должен показывать только структурные/безопасные различия. Тестируем `source ~/.zshrc` и базовые команды.
9. **README.** Переписать: установка на macOS и Arch, обзор структуры, как добавить новый конфиг, где приватный файл.
10. **Развёртывание на Arch.** `chezmoi init --apply git@github.com:eyeonyou/dotfiles.git`. Создать `~/.config/zsh/work.zsh`. Проверить работу всех конфигов.

## 8. Критерии успеха

- На обоих ПК работает `chezmoi apply` без ошибок.
- На обоих ПК `ghostty`, `nvim`, `tmux`, `zsh` стартуют и работают как до миграции.
- `git status` чист после `chezmoi apply` (репо не модифицируется самим chezmoi).
- Размер репо после чистки уменьшается минимум в 10× (за счёт удаления `.oh-my-zsh`, `.tmux`, `wallpapers`).
- Секреты не уходят в git (`work.zsh` в `.gitignore`).
- Bootstrap-скрипт ставит пакеты идемпотентно (`--needed` / `brew bundle`).

## 9. Вне скоупа

- Hyprland/sddm-конфиги — отдельный спек после того как Arch заработает с CLI-окружением.
- Миграция с oh-my-zsh на другой плагин-менеджер.
- Шифрованные секреты через age/gpg — пока достаточно `.gitignore`.
- CI-проверка `chezmoi apply` в docker.
- Управление дотфайлами других тулов (vscode, raycast) — добавим если понадобится.
