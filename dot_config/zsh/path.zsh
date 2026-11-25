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

# CUDA Toolkit: make nvcc available in interactive, non-login shells too.
if [ -d /opt/cuda/bin ]; then
  export CUDA_PATH=/opt/cuda
  case ":$PATH:" in
    *:/opt/cuda/bin:*) ;;
    *) export PATH="$CUDA_PATH/bin:$PATH" ;;
  esac
fi
