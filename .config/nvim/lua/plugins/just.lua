return {
  "NoahTheDuke/vim-just",
  ft = {
    "just",
  },
  init = function()
    vim.cmd([[
             au filetype just setlocal shiftwidth=2
         ]])
  end,
}
