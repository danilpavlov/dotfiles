"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../../constants");
async function clearParameters(parameters) {
    const confirm = await vscode_1.window.showQuickPick([constants_1.YES, 'No'], { placeHolder: 'Are you sure you would like to clear all parameters?' });
    if (confirm === constants_1.YES) {
        await parameters.clear();
        vscode_1.window.showInformationMessage('Parameters cleared');
    }
}
exports.default = clearParameters;
//# sourceMappingURL=clear-parameters.js.map