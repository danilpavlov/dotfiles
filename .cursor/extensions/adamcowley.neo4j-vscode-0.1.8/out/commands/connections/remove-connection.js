"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
async function removeConnection(connections) {
    const id = await vscode_1.window.showQuickPick(Object.keys(connections.getState()), { placeHolder: 'Which database would you like to remove?' });
    if (id) {
        await connections.remove(id);
    }
}
exports.default = removeConnection;
//# sourceMappingURL=remove-connection.js.map