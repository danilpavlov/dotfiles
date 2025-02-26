"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor(name, address, role, requestedStatus, currentStatus, error, isDefault) {
        this.name = name;
        this.address = address;
        this.role = role;
        this.requestedStatus = requestedStatus;
        this.currentStatus = currentStatus;
        this.error = error;
        this.isDefault = isDefault;
    }
    getTreeItem() {
        const status = this.currentStatus !== 'online' ? ` (${this.currentStatus})` : '';
        return {
            label: `${this.name}${status}`,
            contextValue: "database",
        };
    }
    getChildren() {
        return [];
    }
}
exports.default = Database;
//# sourceMappingURL=database.class.js.map