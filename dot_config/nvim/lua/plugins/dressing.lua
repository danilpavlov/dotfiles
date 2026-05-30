return {
  "stevearc/dressing.nvim",
  opts = {
    select = {
      backend = { "telescope" },
      telescope = {
        layout_config = {
          width = function(_, max_columns, _)
            return math.min(max_columns, 200)
          end,
          height = function(_, _, max_lines)
            return math.min(max_lines, 100)
          end,
        },
      },
    },
  },
}
