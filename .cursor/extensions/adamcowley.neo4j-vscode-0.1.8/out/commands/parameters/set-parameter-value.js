"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../../constants");
const NULL = '(null)';
async function setParameterValue(parameters, key) {
    const value = await vscode_1.window.showInputBox({
        prompt: `Set value for $${key}`,
        value: NULL,
        ignoreFocusOut: true,
    });
    if (value === undefined) {
        return;
    }
    // Handle Null value
    if (value === NULL) {
        await parameters.set(key, value, constants_1.PARAMETER_TYPE_NULL);
        return;
    }
    const type = await vscode_1.window.showQuickPick(constants_1.parameterTypes, {
        placeHolder: 'What type is this data?'
    });
    await parameters.set(key, value.trim(), type);
}
exports.default = setParameterValue;
//# sourceMappingURL=set-parameter-value.js.map