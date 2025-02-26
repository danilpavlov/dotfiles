"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const confirm_1 = require("../confirm");
async function clearConnections(connections) {
    if (await (0, confirm_1.confirm)('Are you sure you would like to clear all connections?')) {
        await connections.clear();
        vscode_1.window.showInformationMessage('Databases cleared');
    }
}
exports.default = clearConnections;
//# sourceMappingURL=clear-connections.js.map