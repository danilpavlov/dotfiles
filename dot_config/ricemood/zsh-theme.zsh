# ricemood template -> ~/.oh-my-zsh/custom/themes/ricemood.zsh-theme
# Regenerate:  ricemood -a     (edit this file, not the generated one)
#
# Structure kept from murilasso: two lines, host:path on top, git + prompt
# below, exit code on the right. Only the colors are wallpaper-derived.
#
# @V vibrant   @LV light vibrant   @DV dark vibrant
# @M muted     @LM light muted     @DM dark muted

# sand gold - the beach, the one deliberate warm note
local user_host='%B%F{^r@V>sa(0.2)>l(66)^}%n@%m%f%b'

# the blue of the dresses and parasols
local current_dir='%B%F{^r@LM>ro(32)>sa(0.35)>l(68)^}%~%f%b'

# terracotta - the flag on the pole
local rvm_ruby='%F{^r@V>ro(-24)>sa(0.35)>l(62)^}$(ruby_prompt_info)%f'

# violet from the cloud shadows
local git_branch='%F{^r@LM>ro(74)>de(0.3)>l(72)^}$(git_prompt_info)%f'

local return_code="%(?..%F{^r@V>ro(-24)>sa(0.35)>l(62)^}%? ↵%f)"

PROMPT="${user_host}%F{^r@LM>ro(28)>de(0.4)>l(42)^}:%f${current_dir} ${rvm_ruby}
${git_branch} %B%F{^r@LM>ro(28)>de(0.35)>l(58)^}$%f%b "
RPS1="${return_code}"

ZSH_THEME_GIT_PROMPT_PREFIX=""
ZSH_THEME_GIT_PROMPT_SUFFIX=""
ZSH_THEME_GIT_PROMPT_DIRTY=" %F{^r@V>ro(-24)>sa(0.35)>l(62)^}✗%f"
ZSH_THEME_GIT_PROMPT_CLEAN=" %F{^r@V>ro(88)>de(0.42)>l(60)^}✔%f"

# Plugin colors, kept in the theme so they follow the wallpaper too.
# Read lazily by the plugins, so setting them here (after they load) works.
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=^r@LM>ro(28)>de(0.45)>l(38)^"
