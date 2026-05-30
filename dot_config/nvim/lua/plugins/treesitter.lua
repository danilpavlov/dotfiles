return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  main = "nvim-treesitter.configs",
  opts = {
    ensure_installed = {
      "vimdoc",
      "javascript",
      "typescript",
      "c",
      "lua",
      "rust",
      "jsdoc",
      "bash",
      "typst",
      "svelte",
      "python",
      "glsl",
      "make",
      "groovy",
    },
    sync_install = false,
    auto_install = true,
    indent = {
      enable = true,
    },
    highlight = {
      enable = true,
      disable = function(lang, buf)
        if lang == "html" then
          print("disabled treesitter for html")
          return true
        end
        local max_filesize = 100 * 1024 -- 100 KB
        local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
        if ok and stats and stats.size > max_filesize then
          vim.notify(
            "File larger than 100KB treesitter disabled for performance",
            vim.log.levels.WARN,
            { title = "Treesitter" }
          )
          return true
        end
      end,
    },
  },
}
