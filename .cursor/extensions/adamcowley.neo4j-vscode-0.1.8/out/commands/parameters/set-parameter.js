"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../../constants");
async function setParameter(parameters) {
    const param = await vscode_1.window.showInputBox({
        prompt: "Parameter string",
        placeHolder: "eg. key: string, integer => 1234 or map => {a: 1}",
        ignoreFocusOut: true,
    });
    if (!param) {
        return;
    }
    // key => object
    const objectMatch = param.match(/^([a-z0-9\s]+)=>(.*)$/i);
    if (objectMatch) {
        const [_all, key, value] = objectMatch;
        const type = await vscode_1.window.showQuickPick(constants_1.parameterTypes, {
            placeHolder: 'What type is this data?'
        });
        await parameters.set(key, value.trim(), type);
        return;
    }
    // key: string
    const stringMatch = param.match(/^([a-z0-9\s]+):(.*)$/i);
    if (stringMatch) {
        const [_all, key, value] = stringMatch;
        await parameters.set(key.trim(), value.trim());
    }
}
exports.default = setParameter;
//# sourceMappingURL=set-parameter.js.map