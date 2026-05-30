return {
  "folke/flash.nvim",
  event = "VeryLazy",
  -- Minimal config to test basic functionality
  keys = {
    {
      "f",
      mode = { "n", "x", "o" },
      function()
        vim.notify("F key was pressed!")
        local query = vim.fn.input("Search: ")
        vim.notify("You entered: " .. (query or "nothing"))
      end,
      desc = "Test f key"
    },
  },
}