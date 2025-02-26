"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const member_class_1 = require("./member.class");
class Role {
    constructor(role, members = []) {
        this.role = role;
        this.members = members;
    }
    addMember(member) {
        this.members.push(member);
    }
    getTreeItem() {
        return {
            label: this.role,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            contextValue: 'role'
        };
    }
    getChildren() {
        return this.members.length
            ? this.members.map(member => new member_class_1.default(member))
            : [new member_class_1.default('(none)')];
    }
}
exports.default = Role;
//# sourceMappingURL=role.class.js.map