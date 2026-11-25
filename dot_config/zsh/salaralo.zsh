# Source this file to update an existing interactive shell without restarting it.
if [[ ${ZSH_THEME:-} != salaralo ]]; then
  ZSH_THEME=salaralo
  source "$HOME/.oh-my-zsh/custom/themes/salaralo.zsh-theme"
fi
export BAT_THEME=salaralo
export K9S_SKIN=salaralo
if (( ! ${+SALARALO_FZF_BASE_OPTS} )); then
  typeset -g SALARALO_FZF_BASE_OPTS="${FZF_DEFAULT_OPTS:-}"
fi
export FZF_DEFAULT_OPTS="${SALARALO_FZF_BASE_OPTS} --color=fg:#a6a6a6,bg:#080808,hl:#e0e0e0,fg+:#e0e0e0,bg+:#1a1a1a,hl+:#ffffff,info:#848484,prompt:#c4c4c4,pointer:#c4c4c4,marker:#b8b8b8,spinner:#8a8a8a,header:#8a8a8a,border:#3a3a3a"
export LS_COLORS='rs=0:fi=38;2;166;166;166:di=1;38;2;196;196;196:ln=38;2;132;132;132:ex=1;38;2;184;184;184:pi=38;2;104;104;104:so=38;2;132;132;132:bd=38;2;184;184;184:cd=38;2;184;184;184:or=1;4;38;2;224;224;224:mi=1;4;38;2;224;224;224'
export GREP_COLORS='ms=1;38;2;224;224;224:mc=1;38;2;224;224;224:sl=:cx=:fn=38;2;196;196;196:ln=38;2;132;132;132:bn=38;2;132;132;132:se=38;2;104;104;104'
typeset -gA ZSH_HIGHLIGHT_STYLES
ZSH_HIGHLIGHT_STYLES[default]='fg=#a6a6a6'
ZSH_HIGHLIGHT_STYLES[unknown-token]='fg=#e0e0e0,bold,underline'
ZSH_HIGHLIGHT_STYLES[reserved-word]='fg=#d0d0d0,bold'
ZSH_HIGHLIGHT_STYLES[command]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[builtin]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[function]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[alias]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[precommand]='fg=#d0d0d0,bold'
ZSH_HIGHLIGHT_STYLES[commandseparator]='fg=#8a8a8a'
ZSH_HIGHLIGHT_STYLES[path]='fg=#b8b8b8,underline'
ZSH_HIGHLIGHT_STYLES[path_prefix]='fg=#848484'
ZSH_HIGHLIGHT_STYLES[single-quoted-argument]='fg=#a6a6a6'
ZSH_HIGHLIGHT_STYLES[double-quoted-argument]='fg=#a6a6a6'
ZSH_HIGHLIGHT_STYLES[dollar-quoted-argument]='fg=#a6a6a6'
ZSH_HIGHLIGHT_STYLES[dollar-double-quoted-argument]='fg=#c0c0c0'
ZSH_HIGHLIGHT_STYLES[back-double-quoted-argument]='fg=#c0c0c0'
ZSH_HIGHLIGHT_STYLES[redirection]='fg=#d0d0d0'
ZSH_HIGHLIGHT_STYLES[comment]='fg=#686868'
ZSH_HIGHLIGHT_STYLES[suffix-alias]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[hashed-command]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[arg0]='fg=#c4c4c4'
ZSH_HIGHLIGHT_STYLES[single-hyphen-option]='fg=#b8b8b8'
ZSH_HIGHLIGHT_STYLES[double-hyphen-option]='fg=#b8b8b8'
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=#686868'
