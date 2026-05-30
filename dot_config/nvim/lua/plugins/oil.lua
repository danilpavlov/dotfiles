return {
  "stevearc/oil.nvim",
  lazy = false, -- needed at startup so oil intercepts `nvim <dir>`
  dependencies = { "nvim-tree/nvim-web-devicons" },
  ---@type oil.SetupOpts
  opts = {
    default_file_explorer = true,
    delete_to_trash = true,
    skip_confirm_for_simple_edits = false,
    view_options = {
      show_hidden = false,
      is_always_hidden = function(name, _)
        local always_hidden = {
          ["node_modules"] = true,
          ["dist"] = true,
          ["build"] = true,
          [".next"] = true,
          [".nuxt"] = true,
          [".venv"] = true,
          ["venv"] = true,
          ["target"] = true,
          ["coverage"] = true,
          ["__pycache__"] = true,
          [".pytest_cache"] = true,
          [".mypy_cache"] = true,
          [".turbo"] = true,
          [".cache"] = true,
          [".DS_Store"] = true,
          ["thumbs.db"] = true,
        }
        return always_hidden[name] == true
      end,
    },
    win_options = {
      wrap = false,
      signcolumn = "no",
      cursorcolumn = false,
      foldcolumn = "0",
      spell = false,
      list = false,
      conceallevel = 3,
      concealcursor = "nvic",
    },
  },
  keys = {
    { "-", "<cmd>Oil<cr>", desc = "Open parent directory (oil)" },
    { "<leader>cw", function() require("oil").open(vim.uv.cwd()) end, desc = "Open oil in cwd" },
  },
}
