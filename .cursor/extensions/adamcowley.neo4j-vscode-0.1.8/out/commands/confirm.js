"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = void 0;
const vscode_1 = require("vscode");
const constants_1 = require("../constants");
async function confirm(placeHolder) {
    const confirm = await vscode_1.window.showQuickPick([constants_1.YES, 'No'], { placeHolder });
    return confirm === constants_1.YES;
}
exports.confirm = confirm;
//# sourceMappingURL=confirm.js.map