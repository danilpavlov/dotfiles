return {
  "https://github.com/Weyaaron/nvim-training",
  pin = true,
  -- nvim-training's setup() has two noisy quirks: its arg validator warns on any
  -- option whose default is `false` (it tests `if not user_config[key]`, so a
  -- valid `enable_repeat_on_failure` trips it), and it shells out to `mkdir`
  -- without `-p` (printing "File exists" on every later start). The `:Training`
  -- command is registered from the plugin's own `plugin/` file, so setup() isn't
  -- needed — set the option directly and create the dirs ourselves instead.
  config = function()
    local cfg = require("nvim-training.user_config")
    cfg.enable_repeat_on_failure = true
    vim.fn.mkdir(cfg.logging_args.log_directory_path, "p")
    vim.fn.mkdir(cfg.event_storage_directory_path, "p")
  end,
}
