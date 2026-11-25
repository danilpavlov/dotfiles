return {
  "https://github.com/Weyaaron/nvim-training",
  pin = true,
  -- setup() only copies options onto user_config and mkdirs the log directory,
  -- and it gets both wrong, so do the two steps here instead.
  config = function()
    local user_config = require("nvim-training.user_config")

    -- enable_repeat_on_failure is a real, working option, but passing it
    -- through setup() prints a bogus "not supported" warning on every start:
    -- init.lua checks `if not user_config[i]`, and the default is `false`,
    -- so every option defaulting to false trips it.
    user_config.enable_repeat_on_failure = true

    -- setup() runs `os.execute("mkdir " .. path)` with no -p, which writes
    -- "cannot create directory: File exists" to stderr on every start after
    -- the first. logging.lua never creates the directory itself, so it does
    -- have to exist -- just make it idempotently.
    vim.fn.mkdir(user_config.logging_args.log_directory_path, "p")
  end,
}
