# Create or reattach to a tmux session named after the current directory
dev() {
  local dir_name=$(basename "$PWD")
  local session_name="$dir_name"

  if tmux has-session -t "$session_name" 2>/dev/null; then
    echo "Attaching to existing tmux session: $session_name"
    tmux switch-client -t "$session_name" 2>/dev/null || tmux attach-session -t "$session_name"
    tmux select-window -t "$session_name:1"
    return
  fi

  tmux new-session -d -s "$session_name" -n EDITOR
  tmux new-window -t "$session_name:" -n SHELL

  tmux select-window -t "$session_name:1"
  tmux attach-session -t "$session_name"
}
