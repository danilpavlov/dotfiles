"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
async function setActiveConnection(connections, selected) {
    if (selected !== undefined) {
        await connections.setActive(selected);
        return;
    }
    const id = await vscode_1.window.showQuickPick(Object.keys(connections.getState()), { placeHolder: 'Choose active connection?' });
    if (id) {
        await connections.setActive(id);
    }
}
exports.default = setActiveConnection;
//# sourceMappingURL=set-active-connection.js.map