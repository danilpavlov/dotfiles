"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const constants_1 = require("../constants");
const connection_status_1 = require("../status/connection-status");
const connection_tree_provider_1 = require("./connection-tree.provider");
class ConnectionManager {
    constructor(context) {
        this.context = context;
        this.tree = new connection_tree_provider_1.default(context, this);
    }
    getTreeProvider() {
        return this.tree;
    }
    getState() {
        return this.context.globalState.get(constants_1.CONNECTIONS) || {};
    }
    hasConnections() {
        const state = this.getState();
        return Object.keys(state).length > 0;
    }
    async updateState(state) {
        await this.context.globalState.update(constants_1.CONNECTIONS, state);
        this.tree.refresh();
        (0, connection_status_1.updateActiveConnectionStatusBarItem)(this);
    }
    async add(connection) {
        const connections = this.getState();
        // eslint-disable-next-line max-len
        let id = `${connection.scheme}://${connection.username}@${connection.host}:${connection.port}`;
        if (connection.database) {
            id += `?database=${connection.database}`;
        }
        // Active Connection?
        connection.active = Object.keys(connections).length === 0;
        connections[id] = connection;
        await this.updateState(connections);
        // Display a message box to the user
        vscode.window.showInformationMessage(`Connection added to ${id}.`);
    }
    async get(id) {
        return this.getState()[id];
    }
    async remove(id) {
        const connections = this.getState();
        if (connections.hasOwnProperty(id)) {
            delete connections[id];
            await this.updateState(connections);
            vscode.window.showInformationMessage(`Removed connection to ${id}.`);
        }
    }
    async setActive(id) {
        const connections = this.getState();
        if (connections.hasOwnProperty(id)) {
            // Set others inactive
            for (const key in connections) {
                connections[key].active = false;
            }
            // Set this one to active
            connections[id].active = true;
            await this.updateState(connections);
            vscode.window.showInformationMessage(`Active connection set to ${id}.`);
        }
    }
    async getActive() {
        const state = this.getState();
        for (const key in state) {
            if (state[key].active) {
                return state[key];
            }
        }
    }
    async clear() {
        await this.updateState({});
    }
}
exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.class.js.map