"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = require("neo4j-driver");
const vscode = require("vscode");
const constants_1 = require("../constants");
const parameter_tree_provider_1 = require("./parameter-tree.provider");
function convertParameter(parameter) {
    switch (parameter.type) {
        case constants_1.PARAMETER_TYPE_NULL:
            return [parameter.key, null];
        case constants_1.PARAMETER_TYPE_INT:
            return [parameter.key, (0, neo4j_driver_1.int)(parameter.value)];
        case constants_1.PARAMETER_TYPE_FLOAT:
            return [parameter.key, parseFloat(parameter.value)];
        case constants_1.PARAMETER_TYPE_OBJECT:
            return [parameter.key, JSON.parse(parameter.value)];
        default:
            return [parameter.key, parameter.value];
    }
}
class ParameterManager {
    constructor(context) {
        this.context = context;
        this.tree = new parameter_tree_provider_1.default(context, this);
    }
    getTreeProvider() {
        return this.tree;
    }
    getState() {
        return this.context.globalState.get(constants_1.PARAMETERS) || {};
    }
    has(key) {
        const state = this.getState();
        return state.hasOwnProperty(key);
    }
    clear() {
        return this.updateState({});
    }
    async updateState(state) {
        await this.context.globalState.update(constants_1.PARAMETERS, state);
        this.tree.refresh();
    }
    async asParameters() {
        const parameters = this.getState();
        return Object.fromEntries(Object.values(parameters)
            .map((param) => convertParameter(param)));
    }
    async keys() {
        const parameters = this.getState();
        return Object.keys(parameters);
    }
    async set(key, value, type = constants_1.PARAMETER_TYPE_STRING) {
        const parameters = this.getState();
        parameters[key.trim()] = { key: key.trim(), value, type };
        await this.updateState(parameters);
        vscode.window.showInformationMessage(`Parameter \`${key}\` set.`);
    }
    async remove(key) {
        const parameters = this.getState();
        delete parameters[key];
        await this.updateState(parameters);
        vscode.window.showInformationMessage(`Parameter \`${key}\` removed.`);
    }
}
exports.default = ParameterManager;
//# sourceMappingURL=parameters.manager.js.map