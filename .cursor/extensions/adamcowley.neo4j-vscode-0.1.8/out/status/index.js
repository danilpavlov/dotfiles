"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_status_1 = require("./connection-status");
function registerStatusBarSubscriptions(context, connections) {
    (0, connection_status_1.default)(context, connections);
}
exports.default = registerStatusBarSubscriptions;
//# sourceMappingURL=index.js.map