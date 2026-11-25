-- ricemood template -> ~/.config/nvim/colors/ricemood.lua
-- Regenerate:  ricemood -a     (edit this file, not the generated one)
--
-- Palette is sampled from the current wallpaper. Semantics match the ghostty
-- and zsh themes: cool blue-grey neutrals from the sky, sand kept as a warm
-- accent, terracotta/sage/violet picked out of the figures and clouds.
--
-- @V vibrant   @LV light vibrant   @DV dark vibrant
-- @M muted     @LM light muted     @DM dark muted

vim.cmd("highlight clear")
if vim.fn.exists("syntax_on") == 1 then
    vim.cmd("syntax reset")
end
vim.g.colors_name = "ricemood"
vim.o.termguicolors = true

-- Transparency follows the ghostty background-opacity setup. Set
-- vim.g.ricemood_transparent = false before :colorscheme for a solid bg.
local transparent = vim.g.ricemood_transparent ~= false

local c = {
    -- neutrals: the sky, rotated off cyan toward blue and desaturated hard
    bg = "^r@LM>ro(28)>de(0.55)>l(8)^",
    bg_alt = "^r@LM>ro(28)>de(0.5)>l(12)^",
    bg_high = "^r@LM>ro(28)>de(0.48)>l(16)^",
    bg_sel = "^r@LM>ro(28)>de(0.32)>l(26)^",
    border = "^r@LM>ro(28)>de(0.42)>l(30)^",
    gutter = "^r@LM>ro(28)>de(0.45)>l(34)^",
    comment = "^r@LM>ro(28)>de(0.42)>l(47)^",
    fg_dim = "^r@LM>ro(28)>de(0.4)>l(62)^",
    fg = "^r@LM>ro(28)>de(0.62)>l(87)^",
    fg_hi = "^r@LM>ro(28)>de(0.62)>l(95)^",

    -- accents
    sand = "^r@V>sa(0.2)>l(66)^",
    sand_hi = "^r@V>sa(0.25)>l(77)^",
    terra = "^r@V>ro(-24)>sa(0.35)>l(62)^",
    terra_hi = "^r@V>ro(-24)>sa(0.45)>l(72)^",
    sage = "^r@V>ro(88)>de(0.42)>l(60)^",
    sage_hi = "^r@V>ro(88)>de(0.32)>l(70)^",
    blue = "^r@LM>ro(32)>sa(0.35)>l(68)^",
    blue_dim = "^r@LM>ro(32)>sa(0.3)>l(56)^",
    violet = "^r@LM>ro(74)>de(0.3)>l(72)^",
    cyan = "^r@LM>de(0.12)>l(70)^",

    -- muted washes for diffs and search
    wash_add = "^r@V>ro(88)>de(0.45)>l(17)^",
    wash_del = "^r@V>ro(-24)>de(0.4)>l(17)^",
    wash_chg = "^r@LM>ro(32)>de(0.4)>l(17)^",
    wash_txt = "^r@LM>ro(32)>de(0.32)>l(27)^",
    wash_warn = "^r@V>de(0.45)>l(17)^",
}

local bg = transparent and "NONE" or c.bg
local bg_panel = transparent and "NONE" or c.bg_alt

local function apply(groups)
    for name, spec in pairs(groups) do
        vim.api.nvim_set_hl(0, name, spec)
    end
end

apply({
    -- ui
    Normal = { fg = c.fg, bg = bg },
    NormalNC = { fg = c.fg, bg = bg },
    NormalFloat = { fg = c.fg, bg = bg_panel },
    FloatBorder = { fg = c.border, bg = bg_panel },
    FloatTitle = { fg = c.sand, bg = bg_panel, bold = true },
    ColorColumn = { bg = c.bg_high },
    Conceal = { fg = c.gutter },
    Cursor = { fg = c.bg, bg = c.fg },
    lCursor = { fg = c.bg, bg = c.fg },
    CursorIM = { fg = c.bg, bg = c.fg },
    CursorLine = { bg = c.bg_high },
    CursorColumn = { bg = c.bg_high },
    CursorLineNr = { fg = c.sand, bold = true },
    LineNr = { fg = c.gutter },
    LineNrAbove = { fg = c.gutter },
    LineNrBelow = { fg = c.gutter },
    Directory = { fg = c.blue },
    EndOfBuffer = { fg = c.bg },
    ErrorMsg = { fg = c.terra, bold = true },
    WarningMsg = { fg = c.sand },
    ModeMsg = { fg = c.fg_dim, bold = true },
    MoreMsg = { fg = c.sage },
    MsgArea = { fg = c.fg },
    Question = { fg = c.blue },
    VertSplit = { fg = c.border },
    WinSeparator = { fg = c.border },
    Folded = { fg = c.fg_dim, bg = c.bg_alt },
    FoldColumn = { fg = c.gutter, bg = bg },
    SignColumn = { fg = c.gutter, bg = bg },
    IncSearch = { fg = c.bg, bg = c.sand },
    CurSearch = { fg = c.bg, bg = c.sand_hi },
    Search = { fg = c.fg_hi, bg = c.wash_txt },
    MatchParen = { fg = c.sand_hi, bold = true },
    NonText = { fg = c.gutter },
    Whitespace = { fg = c.border },
    SpecialKey = { fg = c.border },
    Pmenu = { fg = c.fg, bg = c.bg_alt },
    PmenuSel = { fg = c.fg_hi, bg = c.bg_sel, bold = true },
    PmenuSbar = { bg = c.bg_alt },
    PmenuThumb = { bg = c.border },
    PmenuKind = { fg = c.cyan, bg = c.bg_alt },
    PmenuExtra = { fg = c.comment, bg = c.bg_alt },
    QuickFixLine = { bg = c.bg_sel, bold = true },
    StatusLine = { fg = c.fg_dim, bg = bg_panel },
    StatusLineNC = { fg = c.comment, bg = bg_panel },
    TabLine = { fg = c.comment, bg = bg_panel },
    TabLineFill = { bg = bg },
    TabLineSel = { fg = c.sand, bg = bg, bold = true },
    WinBar = { fg = c.fg_dim, bg = bg },
    WinBarNC = { fg = c.comment, bg = bg },
    Title = { fg = c.sand, bold = true },
    Visual = { bg = c.bg_sel },
    VisualNOS = { bg = c.bg_sel },
    WildMenu = { fg = c.bg, bg = c.sand },
    SpellBad = { sp = c.terra, undercurl = true },
    SpellCap = { sp = c.sand, undercurl = true },
    SpellLocal = { sp = c.cyan, undercurl = true },
    SpellRare = { sp = c.violet, undercurl = true },

    -- diff
    DiffAdd = { bg = c.wash_add },
    DiffChange = { bg = c.wash_chg },
    DiffDelete = { fg = c.terra, bg = c.wash_del },
    DiffText = { bg = c.wash_txt, bold = true },
    Added = { fg = c.sage },
    Changed = { fg = c.blue },
    Removed = { fg = c.terra },

    -- legacy syntax
    Comment = { fg = c.comment, italic = true },
    Constant = { fg = c.terra },
    String = { fg = c.sage },
    Character = { fg = c.sage },
    Number = { fg = c.terra },
    Boolean = { fg = c.terra },
    Float = { fg = c.terra },
    Identifier = { fg = c.fg },
    Function = { fg = c.sand },
    Statement = { fg = c.violet },
    Conditional = { fg = c.violet },
    Repeat = { fg = c.violet },
    Label = { fg = c.violet },
    Operator = { fg = c.fg_dim },
    Keyword = { fg = c.violet },
    Exception = { fg = c.violet },
    PreProc = { fg = c.cyan },
    Include = { fg = c.violet },
    Define = { fg = c.violet },
    Macro = { fg = c.cyan },
    PreCondit = { fg = c.cyan },
    Type = { fg = c.cyan },
    StorageClass = { fg = c.violet },
    Structure = { fg = c.cyan },
    Typedef = { fg = c.cyan },
    Special = { fg = c.sand_hi },
    SpecialChar = { fg = c.sand_hi },
    Tag = { fg = c.blue },
    Delimiter = { fg = c.fg_dim },
    SpecialComment = { fg = c.fg_dim, italic = true },
    Debug = { fg = c.terra },
    Underlined = { fg = c.blue, underline = true },
    Ignore = { fg = c.gutter },
    Error = { fg = c.terra },
    Todo = { fg = c.bg, bg = c.sand, bold = true },

    -- treesitter
    ["@variable"] = { fg = c.fg },
    ["@variable.builtin"] = { fg = c.terra, italic = true },
    ["@variable.parameter"] = { fg = c.blue },
    ["@variable.member"] = { fg = c.blue },
    ["@constant"] = { fg = c.terra },
    ["@constant.builtin"] = { fg = c.terra, italic = true },
    ["@constant.macro"] = { fg = c.cyan },
    ["@module"] = { fg = c.cyan },
    ["@module.builtin"] = { fg = c.cyan, italic = true },
    ["@label"] = { fg = c.violet },
    ["@string"] = { fg = c.sage },
    ["@string.documentation"] = { fg = c.sage, italic = true },
    ["@string.escape"] = { fg = c.sand_hi },
    ["@string.regexp"] = { fg = c.sand_hi },
    ["@string.special"] = { fg = c.sand_hi },
    ["@string.special.url"] = { fg = c.blue, underline = true },
    ["@character"] = { fg = c.sage },
    ["@character.special"] = { fg = c.sand_hi },
    ["@number"] = { fg = c.terra },
    ["@number.float"] = { fg = c.terra },
    ["@boolean"] = { fg = c.terra },
    ["@function"] = { fg = c.sand },
    ["@function.builtin"] = { fg = c.sand, italic = true },
    ["@function.call"] = { fg = c.sand },
    ["@function.macro"] = { fg = c.cyan },
    ["@function.method"] = { fg = c.sand },
    ["@function.method.call"] = { fg = c.sand },
    ["@constructor"] = { fg = c.cyan },
    ["@operator"] = { fg = c.fg_dim },
    ["@keyword"] = { fg = c.violet },
    ["@keyword.function"] = { fg = c.violet },
    ["@keyword.operator"] = { fg = c.violet },
    ["@keyword.return"] = { fg = c.violet, italic = true },
    ["@keyword.import"] = { fg = c.violet },
    ["@keyword.exception"] = { fg = c.violet },
    ["@keyword.conditional"] = { fg = c.violet },
    ["@keyword.repeat"] = { fg = c.violet },
    ["@punctuation.delimiter"] = { fg = c.fg_dim },
    ["@punctuation.bracket"] = { fg = c.fg_dim },
    ["@punctuation.special"] = { fg = c.sand_hi },
    ["@comment"] = { fg = c.comment, italic = true },
    ["@comment.todo"] = { fg = c.bg, bg = c.sand, bold = true },
    ["@comment.note"] = { fg = c.bg, bg = c.cyan, bold = true },
    ["@comment.warning"] = { fg = c.bg, bg = c.sand_hi, bold = true },
    ["@comment.error"] = { fg = c.bg, bg = c.terra, bold = true },
    ["@type"] = { fg = c.cyan },
    ["@type.builtin"] = { fg = c.cyan, italic = true },
    ["@type.definition"] = { fg = c.cyan },
    ["@property"] = { fg = c.blue },
    ["@field"] = { fg = c.blue },
    ["@attribute"] = { fg = c.cyan },
    ["@tag"] = { fg = c.violet },
    ["@tag.builtin"] = { fg = c.violet },
    ["@tag.attribute"] = { fg = c.blue },
    ["@tag.delimiter"] = { fg = c.fg_dim },
    ["@markup.heading"] = { fg = c.sand, bold = true },
    ["@markup.strong"] = { fg = c.fg_hi, bold = true },
    ["@markup.italic"] = { italic = true },
    ["@markup.strikethrough"] = { strikethrough = true },
    ["@markup.underline"] = { underline = true },
    ["@markup.link"] = { fg = c.blue },
    ["@markup.link.url"] = { fg = c.blue, underline = true },
    ["@markup.link.label"] = { fg = c.cyan },
    ["@markup.raw"] = { fg = c.sage },
    ["@markup.list"] = { fg = c.violet },
    ["@markup.list.checked"] = { fg = c.sage },
    ["@markup.list.unchecked"] = { fg = c.fg_dim },
    ["@markup.quote"] = { fg = c.comment, italic = true },
    ["@diff.plus"] = { fg = c.sage },
    ["@diff.minus"] = { fg = c.terra },
    ["@diff.delta"] = { fg = c.blue },

    -- lsp semantic tokens
    ["@lsp.type.class"] = { fg = c.cyan },
    ["@lsp.type.decorator"] = { fg = c.cyan },
    ["@lsp.type.enum"] = { fg = c.cyan },
    ["@lsp.type.enumMember"] = { fg = c.terra },
    ["@lsp.type.function"] = { fg = c.sand },
    ["@lsp.type.interface"] = { fg = c.cyan },
    ["@lsp.type.macro"] = { fg = c.cyan },
    ["@lsp.type.method"] = { fg = c.sand },
    ["@lsp.type.namespace"] = { fg = c.cyan },
    ["@lsp.type.parameter"] = { fg = c.blue },
    ["@lsp.type.property"] = { fg = c.blue },
    ["@lsp.type.struct"] = { fg = c.cyan },
    ["@lsp.type.type"] = { fg = c.cyan },
    ["@lsp.type.typeParameter"] = { fg = c.cyan },
    ["@lsp.type.variable"] = { fg = c.fg },
    ["@lsp.mod.readonly"] = { fg = c.terra },
    LspReferenceText = { bg = c.bg_sel },
    LspReferenceRead = { bg = c.bg_sel },
    LspReferenceWrite = { bg = c.bg_sel, underline = true },
    LspInlayHint = { fg = c.gutter, bg = bg_panel, italic = true },
    LspSignatureActiveParameter = { fg = c.sand, bold = true },
    LspCodeLens = { fg = c.comment, italic = true },

    -- diagnostics
    DiagnosticError = { fg = c.terra },
    DiagnosticWarn = { fg = c.sand },
    DiagnosticInfo = { fg = c.blue },
    DiagnosticHint = { fg = c.cyan },
    DiagnosticOk = { fg = c.sage },
    DiagnosticUnderlineError = { sp = c.terra, undercurl = true },
    DiagnosticUnderlineWarn = { sp = c.sand, undercurl = true },
    DiagnosticUnderlineInfo = { sp = c.blue, undercurl = true },
    DiagnosticUnderlineHint = { sp = c.cyan, undercurl = true },
    DiagnosticUnderlineOk = { sp = c.sage, undercurl = true },
    DiagnosticVirtualTextError = { fg = c.terra, bg = c.wash_del },
    DiagnosticVirtualTextWarn = { fg = c.sand, bg = c.wash_warn },
    DiagnosticVirtualTextInfo = { fg = c.blue, bg = c.wash_chg },
    DiagnosticVirtualTextHint = { fg = c.cyan, bg = c.wash_chg },
    DiagnosticUnnecessary = { fg = c.gutter, italic = true },
    DiagnosticDeprecated = { fg = c.comment, strikethrough = true },

    -- gitsigns
    GitSignsAdd = { fg = c.sage },
    GitSignsChange = { fg = c.blue },
    GitSignsDelete = { fg = c.terra },
    GitSignsAddInline = { bg = c.wash_add },
    GitSignsChangeInline = { bg = c.wash_chg },
    GitSignsDeleteInline = { bg = c.wash_del },
    GitSignsCurrentLineBlame = { fg = c.gutter, italic = true },

    -- nvim-cmp
    CmpItemAbbr = { fg = c.fg_dim },
    CmpItemAbbrDeprecated = { fg = c.gutter, strikethrough = true },
    CmpItemAbbrMatch = { fg = c.sand, bold = true },
    CmpItemAbbrMatchFuzzy = { fg = c.sand_hi, bold = true },
    CmpItemMenu = { fg = c.comment, italic = true },
    CmpItemKind = { fg = c.cyan },
    CmpItemKindFunction = { fg = c.sand },
    CmpItemKindMethod = { fg = c.sand },
    CmpItemKindVariable = { fg = c.fg },
    CmpItemKindField = { fg = c.blue },
    CmpItemKindProperty = { fg = c.blue },
    CmpItemKindKeyword = { fg = c.violet },
    CmpItemKindSnippet = { fg = c.sage },
    CmpItemKindText = { fg = c.fg_dim },
    CmpItemKindClass = { fg = c.cyan },
    CmpItemKindInterface = { fg = c.cyan },
    CmpItemKindModule = { fg = c.cyan },
    CmpItemKindConstant = { fg = c.terra },

    -- telescope / snacks picker
    TelescopeNormal = { fg = c.fg, bg = bg_panel },
    TelescopeBorder = { fg = c.border, bg = bg_panel },
    TelescopeTitle = { fg = c.sand, bold = true },
    TelescopePromptNormal = { fg = c.fg, bg = c.bg_alt },
    TelescopePromptBorder = { fg = c.border, bg = c.bg_alt },
    TelescopePromptPrefix = { fg = c.sand },
    TelescopeSelection = { fg = c.fg_hi, bg = c.bg_sel, bold = true },
    TelescopeMatching = { fg = c.sand, bold = true },
    SnacksPickerDir = { fg = c.comment },
    SnacksPickerMatch = { fg = c.sand, bold = true },
    SnacksPickerBorder = { fg = c.border, bg = bg_panel },
    SnacksPickerTitle = { fg = c.sand, bold = true },
    SnacksNormal = { fg = c.fg, bg = bg_panel },
    SnacksIndent = { fg = c.bg_high },
    SnacksIndentScope = { fg = c.border },

    -- oil
    OilDir = { fg = c.blue, bold = true },
    OilDirIcon = { fg = c.blue },
    OilLink = { fg = c.cyan, underline = true },
    OilFile = { fg = c.fg },
    OilCreate = { fg = c.sage },
    OilDelete = { fg = c.terra },
    OilMove = { fg = c.blue },
    OilCopy = { fg = c.cyan },

    -- neogit
    NeogitBranch = { fg = c.violet, bold = true },
    NeogitRemote = { fg = c.cyan },
    NeogitHunkHeader = { fg = c.fg_dim, bg = c.bg_high },
    NeogitHunkHeaderHighlight = { fg = c.sand, bg = c.bg_sel },
    NeogitDiffAdd = { fg = c.sage, bg = c.wash_add },
    NeogitDiffDelete = { fg = c.terra, bg = c.wash_del },
    NeogitDiffContext = { fg = c.fg_dim },
    NeogitSectionHeader = { fg = c.sand, bold = true },

    -- misc plugins
    TreesitterContext = { bg = c.bg_high },
    TreesitterContextLineNumber = { fg = c.gutter, bg = c.bg_high },
    FlashLabel = { fg = c.bg, bg = c.terra, bold = true },
    FlashMatch = { fg = c.fg_hi, bg = c.bg_sel },
    FlashCurrent = { fg = c.bg, bg = c.sand },
    HarpoonBorder = { fg = c.border, bg = bg_panel },
    HarpoonWindow = { fg = c.fg, bg = bg_panel },
    WhichKey = { fg = c.violet },
    WhichKeyGroup = { fg = c.blue },
    WhichKeyDesc = { fg = c.fg },
    WhichKeySeparator = { fg = c.comment },
    WhichKeyFloat = { bg = bg_panel },
    WhichKeyBorder = { fg = c.border, bg = bg_panel },
    DashboardHeader = { fg = c.blue_dim },
    DashboardFooter = { fg = c.comment, italic = true },
    DashboardDesc = { fg = c.fg_dim },
    DashboardIcon = { fg = c.sand },
    DashboardKey = { fg = c.terra },
    DashboardShortCut = { fg = c.violet },
    MiniIndentscopeSymbol = { fg = c.border },
    IndentBlanklineChar = { fg = c.bg_high },
    NotifyERRORBorder = { fg = c.terra },
    NotifyWARNBorder = { fg = c.sand },
    NotifyINFOBorder = { fg = c.blue },
    NotifyDEBUGBorder = { fg = c.comment },
    NotifyTRACEBorder = { fg = c.violet },
    NotifyERRORTitle = { fg = c.terra },
    NotifyWARNTitle = { fg = c.sand },
    NotifyINFOTitle = { fg = c.blue },
    LazyNormal = { fg = c.fg, bg = bg_panel },
    LazyProgressDone = { fg = c.sage, bold = true },
    LazyProgressTodo = { fg = c.border },
    MasonNormal = { fg = c.fg, bg = bg_panel },
})

-- terminal colors inside :terminal, mirrored from the ghostty palette
vim.g.terminal_color_0 = "^r@LM>ro(28)>de(0.45)>l(20)^"
vim.g.terminal_color_8 = "^r@LM>ro(28)>de(0.4)>l(38)^"
vim.g.terminal_color_1 = "^r@V>ro(-24)>sa(0.35)>l(58)^"
vim.g.terminal_color_9 = "^r@V>ro(-24)>sa(0.45)>l(70)^"
vim.g.terminal_color_2 = "^r@V>ro(88)>de(0.52)>l(47)^"
vim.g.terminal_color_10 = "^r@V>ro(88)>de(0.42)>l(62)^"
vim.g.terminal_color_3 = "^r@V>sa(0.25)>l(62)^"
vim.g.terminal_color_11 = "^r@V>sa(0.3)>l(75)^"
vim.g.terminal_color_4 = "^r@LM>ro(32)>sa(0.45)>l(54)^"
vim.g.terminal_color_12 = "^r@LM>ro(32)>sa(0.3)>l(68)^"
vim.g.terminal_color_5 = "^r@LM>ro(74)>de(0.42)>l(62)^"
vim.g.terminal_color_13 = "^r@LM>ro(74)>de(0.32)>l(75)^"
vim.g.terminal_color_6 = "^r@LM>l(60)^"
vim.g.terminal_color_14 = "^r@LM>l(74)^"
vim.g.terminal_color_7 = "^r@LM>ro(28)>de(0.55)>l(81)^"
vim.g.terminal_color_15 = "^r@LM>ro(28)>de(0.62)>l(95)^"
