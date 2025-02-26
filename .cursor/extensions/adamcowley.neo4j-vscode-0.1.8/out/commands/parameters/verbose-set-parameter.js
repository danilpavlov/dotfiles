"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../../constants");
async function verboseSetParameter(parameters) {
    const key = await vscode_1.window.showInputBox({
        prompt: "Key",
        // eslint-disable-next-line max-len
        placeHolder: "This parameter can be used by prefixing the key with $ in your Cypher statements",
        ignoreFocusOut: true,
    });
    if (!key) {
        return;
    }
    const value = await vscode_1.window.showInputBox({
        prompt: "Value",
        ignoreFocusOut: true,
    });
    if (!value) {
        return;
    }
    const type = await vscode_1.window.showQuickPick(constants_1.parameterTypes, { placeHolder: 'What type is this data?' });
    await parameters.set(key.trim(), value.trim(), type);
}
exports.default = verboseSetParameter;
//# sourceMappingURL=verbose-set-parameter.js.map