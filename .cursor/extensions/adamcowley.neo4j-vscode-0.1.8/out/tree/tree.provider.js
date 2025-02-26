"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const vscode = require("vscode");
class TreeProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    getTreeItem(element) {
        return element.getTreeItem();
    }
    refresh(element) {
        this._onDidChangeTreeData.fire(element);
    }
}
exports.default = TreeProvider;
//# sourceMappingURL=tree.provider.js.map