# Keep the existing two-line prompt, using the SalarAlo palette.
local user_host='%B%F{#c4c4c4}%n@%m%f%b'
local current_dir='%B%F{#b8b8b8}%~%f%b'
local rvm_ruby='%F{#a6a6a6}$(ruby_prompt_info)%f'
local git_branch='%F{#d0d0d0}$(git_prompt_info)%f'
local return_code="%(?..%B%F{#e0e0e0}%? ↵%f%b)"
PROMPT="${user_host}%F{#686868}:%f${current_dir} ${rvm_ruby}
${git_branch} %B%F{#c4c4c4}$%f%b "
RPS1="${return_code}"
ZSH_THEME_GIT_PROMPT_PREFIX=""
ZSH_THEME_GIT_PROMPT_SUFFIX=""
ZSH_THEME_GIT_PROMPT_DIRTY=" %B%F{#e0e0e0}✗%f%b"
ZSH_THEME_GIT_PROMPT_CLEAN=" %F{#a6a6a6}✔%f"
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#686868"
