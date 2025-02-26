"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLTreeDataProvider = void 0;
const vscode = require("vscode");
const constants_1 = require("../common/constants");
const global_1 = require("../common/global");
const connectionNode_1 = require("./connectionNode");
class PostgreSQLTreeDataProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.refresh();
    }
    static getInstance(context) {
        if (context && !this._instance) {
            this._instance = new PostgreSQLTreeDataProvider(context);
            context.subscriptions.push(vscode.window.registerTreeDataProvider("postgres", this._instance));
        }
        return this._instance;
    }
    refresh(element) {
        this._onDidChangeTreeData.fire(element);
    }
    getTreeItem(element) {
        return element.getTreeItem();
    }
    getChildren(element) {
        if (!element) {
            return this.getConnectionNodes();
        }
        return element.getChildren();
    }
    getConnectionNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            const connections = this.context.globalState.get(constants_1.Constants.GlobalStateKey);
            const ConnectionNodes = [];
            if (connections) {
                for (const id of Object.keys(connections)) {
                    let connection = Object.assign({}, connections[id]);
                    if (connection.hasPassword || !connection.hasOwnProperty('hasPassword')) {
                        connection.password = yield global_1.Global.context.secrets.get(id);
                    }
                    ConnectionNodes.push(new connectionNode_1.ConnectionNode(id, connection));
                }
            }
            return ConnectionNodes;
        });
    }
}
exports.PostgreSQLTreeDataProvider = PostgreSQLTreeDataProvider;
PostgreSQLTreeDataProvider._instance = null;
//# sourceMappingURL=treeProvider.js.map