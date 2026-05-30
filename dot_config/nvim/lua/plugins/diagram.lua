return {
  "3rd/diagram.nvim",
  dependencies = { "3rd/image.nvim" },
  ft = { "markdown", "norg" },
  opts = {
    renderer_options = {
      mermaid = {
        background = "transparent",
        theme = "dark",
        scale = 2,
      },
    },
  },
}
