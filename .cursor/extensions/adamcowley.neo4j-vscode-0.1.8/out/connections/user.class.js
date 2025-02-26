"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class User {
    constructor(user, roles, passwordChangeRequired, suspended) {
        this.user = user;
        this.roles = roles;
        this.passwordChangeRequired = passwordChangeRequired;
        this.suspended = suspended;
    }
    getTreeItem() {
        const icon = this.suspended ? 'user-disabled' : 'user';
        const status = this.suspended ? ` (suspended)` : '';
        return {
            label: `${this.user}${status}`,
            contextValue: "database",
            iconPath: {
                light: path.join(__filename, '..', '..', '..', 'images', 'icons', `${icon}-light.svg`),
                dark: path.join(__filename, '..', '..', '..', 'images', 'icons', `${icon}-light.dark`),
            },
        };
    }
    getChildren() {
        return [];
    }
}
exports.default = User;
//# sourceMappingURL=user.class.js.map