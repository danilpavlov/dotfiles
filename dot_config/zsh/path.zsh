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
