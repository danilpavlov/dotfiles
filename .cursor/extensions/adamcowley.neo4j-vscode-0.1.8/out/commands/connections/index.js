"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSubscriptions = void 0;
const vscode_1 = require("vscode");
const instance_class_1 = require("../../connections/instance.class");
const constants_1 = require("../../constants");
const runner_1 = require("../../cypher/runner");
const run_cypher_1 = require("../cypher/run-cypher");
const add_aura_connection_1 = require("./add-aura-connection");
const add_connection_1 = require("./add-connection");
const add_localhost_1 = require("./add-localhost");
const clear_connections_1 = require("./clear-connections");
const open_neo4j_browser_1 = require("./open-neo4j-browser");
const remove_connection_1 = require("./remove-connection");
const set_active_connection_1 = require("./set-active-connection");
function connectionSubscriptions(context, connections, parameters) {
    context.subscriptions.push(vscode_1.window.registerTreeDataProvider("neo4j.connections", connections.getTreeProvider()));
    context.subscriptions.push(vscode_1.commands.registerCommand("neo4j.removeConnection", () => (0, remove_connection_1.default)(connections)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.addLocalhost', async () => (0, add_localhost_1.default)(connections)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.refresh', async () => connections.getTreeProvider().refresh()));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.addConnection', () => (0, add_connection_1.default)(connections)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.addAuraConnection', () => (0, add_aura_connection_1.default)(connections)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.clearConnections', () => (0, clear_connections_1.default)(connections)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.setActiveConnection', (connection) => {
        if (connection instanceof instance_class_1.default) {
            connection = connection.id;
        }
        (0, set_active_connection_1.default)(connections, connection);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.openNeo4jBrowser', (connection) => (0, open_neo4j_browser_1.default)(connections, connection)));
    // Cypher Queries
    const runner = new runner_1.default(context, connections, parameters);
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.runReadCypher', () => (0, run_cypher_1.default)(connections, runner, constants_1.METHOD_READ)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.runWriteCypher', () => (0, run_cypher_1.default)(connections, runner, constants_1.METHOD_WRITE)));
}
exports.connectionSubscriptions = connectionSubscriptions;
//# sourceMappingURL=index.js.map