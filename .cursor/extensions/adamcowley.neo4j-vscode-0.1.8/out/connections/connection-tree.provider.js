"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_provider_1 = require("../tree/tree.provider");
const instance_class_1 = require("./instance.class");
class ConnectionTreeProvider extends tree_provider_1.default {
    constructor(context, connections) {
        super(context);
        this.connections = connections;
    }
    getChildren(element) {
        if (!element) {
            return this.getConnectionNodes();
        }
        return element.getChildren();
    }
    getConnectionNodes() {
        const connections = this.connections.getState();
        return Promise.resolve(Object.entries(connections)
            .map(([id, n]) => new instance_class_1.default(id, n.host, n.scheme, n.host, n.port, n.username, n.password, n.database, n.active)));
    }
}
exports.default = ConnectionTreeProvider;
//# sourceMappingURL=connection-tree.provider.js.map