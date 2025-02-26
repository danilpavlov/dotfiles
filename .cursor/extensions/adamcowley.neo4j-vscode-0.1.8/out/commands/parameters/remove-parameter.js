"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const confirm_1 = require("../confirm");
async function removeParameter(parameters, selected) {
    if (selected !== undefined) {
        if (await (0, confirm_1.confirm)(`Are you sure you want to remove \`${selected.getKey()}\`?`)) {
            await parameters.remove(selected.getKey());
        }
        return;
    }
    const keys = await parameters.keys();
    const key = await vscode_1.window.showQuickPick(keys, { placeHolder: `Which parameter would you like to remove?` });
    if (!key) {
        return;
    }
    await parameters.remove(key);
}
exports.default = removeParameter;
//# sourceMappingURL=remove-parameter.js.map