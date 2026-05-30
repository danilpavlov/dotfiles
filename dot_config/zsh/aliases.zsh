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
