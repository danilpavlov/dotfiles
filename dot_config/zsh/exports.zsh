export EDITOR=nvim
export BAT_THEME=vague

eval "$(fzf --zsh)"
eval $(thefuck --alias)
eval $(thefuck --alias FUCK)

if [ -n "${GHOSTTY_RESOURCES_DIR}" ]; then
  builtin source "${GHOSTTY_RESOURCES_DIR}/shell-integration/zsh/ghostty-integration"
fi
