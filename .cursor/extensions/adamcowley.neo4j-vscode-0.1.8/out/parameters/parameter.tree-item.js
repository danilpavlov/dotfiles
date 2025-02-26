"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ParameterTreeItem {
    constructor(parameter) {
        this.parameter = parameter;
    }
    getKey() {
        return this.parameter.key;
    }
    getTreeItem() {
        return {
            id: this.parameter.key,
            label: `${this.parameter.key} (${this.parameter.type})`,
            contextValue: "parameter",
            iconPath: (0, utils_1.iconPath)('parameter'),
            command: {
                title: "Set Parameter Value",
                command: "neo4j.setParameterValue",
                arguments: [this.parameter.key],
                tooltip: "Set the value for this parameter",
            }
        };
    }
    getChildren() {
        return [];
    }
}
exports.default = ParameterTreeItem;
//# sourceMappingURL=parameter.tree-item.js.map