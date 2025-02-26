"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActiveConnectionStatusBarItem = void 0;
const vscode_1 = require("vscode");
let activeConnectionStatusBarItem;
function registerDatabaseStatusBarItem(context, connections) {
    activeConnectionStatusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 1);
    updateActiveConnectionStatusBarItem(connections);
    context.subscriptions.push(activeConnectionStatusBarItem);
    activeConnectionStatusBarItem.show();
}
exports.default = registerDatabaseStatusBarItem;
async function updateActiveConnectionStatusBarItem(connections) {
    if (!activeConnectionStatusBarItem) {
        return;
    }
    if (!connections.hasConnections()) {
        activeConnectionStatusBarItem.text = 'Add Neo4j Connection';
        activeConnectionStatusBarItem.command = 'neo4j.addConnection';
        return;
    }
    const active = await connections.getActive();
    activeConnectionStatusBarItem.command = 'neo4j.setActiveConnection';
    activeConnectionStatusBarItem.text = active
        // eslint-disable-next-line max-len
        ? `$(database) ${active.scheme}://${active.username}@${active.host}:${active.port}${active.database ? `/${active.database}` : ''}`
        : '$(database) No Active Neo4j Connection';
}
exports.updateActiveConnectionStatusBarItem = updateActiveConnectionStatusBarItem;
//# sourceMappingURL=connection-status.js.map