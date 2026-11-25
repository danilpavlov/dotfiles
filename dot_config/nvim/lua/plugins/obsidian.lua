return {
  "obsidian-nvim/obsidian.nvim",
  version = "*",
  ft = "markdown",
  cmd = "Obsidian",
  dependencies = { "nvim-telescope/telescope.nvim" },
  keys = {
    { "<leader>od", "<cmd>Obsidian today<cr>", desc = "Open today's Obsidian note" },
    { "<leader>os", "<cmd>Obsidian search<cr>", desc = "Search Obsidian notes" },
    { "<leader>oo", "<cmd>Obsidian open<cr>", desc = "Open in Obsidian app" },
  },
  opts = {
    legacy_commands = false,
    workspaces = { { name = "obsidian", path = "~/obsidian" } },
    picker = { name = "telescope.nvim" },
    templates = { folder = "templates" },
    daily_notes = { folder = "notes/dailies", template = "daily.md" },
  },
}
