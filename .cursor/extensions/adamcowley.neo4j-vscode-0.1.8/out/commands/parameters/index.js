"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parameterSubscriptions = void 0;
const vscode_1 = require("vscode");
const parameter_tree_item_1 = require("../../parameters/parameter.tree-item");
const clear_parameters_1 = require("./clear-parameters");
const remove_parameter_1 = require("./remove-parameter");
const set_parameter_1 = require("./set-parameter");
const set_parameter_value_1 = require("./set-parameter-value");
function parameterSubscriptions(context, parameters) {
    context.subscriptions.push(vscode_1.window.registerTreeDataProvider("neo4j.parameters", parameters.getTreeProvider()));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.setParameter', () => (0, set_parameter_1.default)(parameters)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.removeParameter', (selected) => (0, remove_parameter_1.default)(parameters, selected)));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.setParameterValue', (selected) => {
        if (selected instanceof parameter_tree_item_1.default) {
            selected = selected.getKey();
        }
        (0, set_parameter_value_1.default)(parameters, selected);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('neo4j.clearParameters', () => (0, clear_parameters_1.default)(parameters)));
}
exports.parameterSubscriptions = parameterSubscriptions;
//# sourceMappingURL=index.js.map