return {
  {
    "neovim/nvim-lspconfig",
    opts = function(_, opts)
      local function get_python_path()
        local cwd = vim.fn.getcwd()
        if vim.fn.filereadable(cwd .. "/.venv/bin/python") == 1 then
          return cwd .. "/.venv/bin/python"
        end
        return vim.fn.exepath("python3") or "python3"
      end

      opts.servers = opts.servers or {}
      opts.servers.pyright = {
        settings = {
          python = {
            pythonPath = get_python_path(),
          },
        },
      }
    end,
  },
}
