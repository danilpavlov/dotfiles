"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_provider_1 = require("../tree/tree.provider");
const parameter_tree_item_1 = require("./parameter.tree-item");
class ParameterTreeProvider extends tree_provider_1.default {
    constructor(context, parameters) {
        super(context);
        this.parameters = parameters;
    }
    getChildren(element) {
        if (!element) {
            return this.getConnectionNodes();
        }
        return element.getChildren();
    }
    getConnectionNodes() {
        const parameters = this.parameters.getState();
        return Promise.resolve(Object.values(parameters)
            .map(parameter => new parameter_tree_item_1.default(parameter)));
    }
}
exports.default = ParameterTreeProvider;
//# sourceMappingURL=parameter-tree.provider.js.map