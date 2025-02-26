"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
class Label {
    constructor(label, contextValue, icon, children = []) {
        this.label = label;
        this.contextValue = contextValue;
        this.icon = icon;
        this.children = children;
    }
    getTreeItem() {
        return {
            label: this.label,
            collapsibleState: this.children.length
                ? vscode.TreeItemCollapsibleState.Collapsed
                : undefined,
            iconPath: {
                light: path.join(__filename, '..', '..', '..', 'images', 'icons', `${this.icon}-light.svg`),
                dark: path.join(__filename, '..', '..', '..', 'images', 'icons', `${this.icon}-light.dark`),
            },
            contextValue: this.contextValue
        };
    }
    getChildren() {
        return this.children;
    }
}
exports.default = Label;
//# sourceMappingURL=label.class.js.map