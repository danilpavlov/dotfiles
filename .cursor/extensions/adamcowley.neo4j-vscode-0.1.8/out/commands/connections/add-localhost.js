"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("../../utils");
async function addLocalhost(connections) {
    const password = await vscode_1.window.showInputBox({
        prompt: "Add neo4j://localhost:7687 with user neo4j?",
        placeHolder: 'Password',
        ignoreFocusOut: true
    });
    if (!password) {
        return;
    }
    await connections.add({
        ...(0, utils_1.extractCredentials)('neo4j://neo4j:neo@localhost:7687'),
        password,
    });
}
exports.default = addLocalhost;
//# sourceMappingURL=add-localhost.js.map