# ricemood template -> ~/.oh-my-zsh/custom/themes/ricemood.zsh-theme
# Regenerate:  ricemood -a     (edit this file, not the generated one)
#
# Structure kept from murilasso: two lines, host:path on top, git + prompt
# below, exit code on the right. Only the colors are wallpaper-derived.
#
# @V vibrant   @LV light vibrant   @DV dark vibrant
# @M muted     @LM light muted     @DM dark muted

# sand gold - the beach, the one deliberate warm note
local user_host='%B%F{#CDB184}%n@%m%f%b'

# the blue of the dresses and parasols
local current_dir='%B%F{#8EA8CD}%~%f%b'

# terracotta - the flag on the pole
local rvm_ruby='%F{#CC8470}$(ruby_prompt_info)%f'

# violet from the cloud shadows
local git_branch='%F{#B1A9C6}$(git_prompt_info)%f'

local return_code="%(?..%F{#CC8470}%? ↵%f)"

PROMPT="${user_host}%F{#596B7E}:%f${current_dir} ${rvm_ruby}
${git_branch} %B%F{#8093A8}$%f%b "
RPS1="${return_code}"

ZSH_THEME_GIT_PROMPT_PREFIX=""
ZSH_THEME_GIT_PROMPT_SUFFIX=""
ZSH_THEME_GIT_PROMPT_DIRTY=" %F{#CC8470}✗%f"
ZSH_THEME_GIT_PROMPT_CLEAN=" %F{#84AE88}✔%f"

# Plugin colors, kept in the theme so they follow the wallpaper too.
# Read lazily by the plugins, so setting them here (after they load) works.
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#526070"
