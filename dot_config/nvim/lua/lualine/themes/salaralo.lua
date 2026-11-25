local c = { fg = "#a6a6a6", bright = "#e0e0e0", dim = "#686868", bg = "#080808", panel = "#1a1a1a" }
local function mode(accent)
  return { a = { fg = c.bg, bg = accent, gui = "bold" }, b = { fg = c.fg, bg = c.panel }, c = { fg = c.fg, bg = c.bg } }
end
return { normal = mode("#c4c4c4"), insert = mode("#a6a6a6"), visual = mode("#d0d0d0"), replace = mode("#e0e0e0"), command = mode("#b8b8b8"), terminal = mode("#a6a6a6"), inactive = { a = { fg = c.dim, bg = c.bg }, b = { fg = c.dim, bg = c.bg }, c = { fg = c.dim, bg = c.bg } } }
