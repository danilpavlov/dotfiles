-- SalarAlo/dotfiles appearance adapted for Hyprland 0.57.
hl.config({
    general = {
        gaps_in = 5, gaps_out = 5, border_size = 2,
        col = { active_border = "rgba(ffffffff)", inactive_border = "rgba(00000000)" },
    },
    decoration = {
        rounding = 5, rounding_power = 2,
        active_opacity = 1.0, inactive_opacity = 0.98,
        shadow = { enabled = false }, blur = { enabled = false },
    },
})
hl.curve("salarSmooth", { type = "bezier", points = {{0.4, 0.0}, {0.2, 1.0}} })
hl.curve("salarSubtle", { type = "bezier", points = {{0.22, 0.9}, {0.3, 1.0}} })
hl.curve("salarStylish", { type = "bezier", points = {{0.2, 1.0}, {0.15, 1.0}} })
hl.animation({ leaf = "windows", enabled = true, speed = 6, bezier = "salarStylish", style = "popin 96%" })
hl.animation({ leaf = "windowsOut", enabled = true, speed = 5, bezier = "salarSmooth", style = "popin 96%" })
hl.animation({ leaf = "border", enabled = true, speed = 9, bezier = "salarSubtle" })
hl.animation({ leaf = "fade", enabled = true, speed = 5, bezier = "salarSmooth" })
hl.animation({ leaf = "layersIn", enabled = true, speed = 5, bezier = "salarSubtle", style = "slide bottom" })
hl.animation({ leaf = "layersOut", enabled = true, speed = 4, bezier = "salarSmooth", style = "slide bottom" })
-- Keep the existing instant workspace switching, monitor, and input settings.
hl.bind("SUPER + RETURN", hl.dsp.exec_cmd("kitty"))
