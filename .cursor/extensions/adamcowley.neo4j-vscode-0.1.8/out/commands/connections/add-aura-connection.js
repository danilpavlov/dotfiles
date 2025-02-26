"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("../../utils");
async function addAuraConnection(connections) {
    const dotEnv = await (0, utils_1.extractCredentialsFromActiveEditor)();
    if (dotEnv.scheme && dotEnv.host && dotEnv.port
        && dotEnv.username && dotEnv.password) {
        await connections.add({
            ...dotEnv,
            active: false,
        });
        return;
    }
    const uri = await vscode_1.window.showInputBox({
        prompt: "Copy and paste your Connection URI from the Aura Console",
        placeHolder: "eg. neo4j+s://[dbid].databases.neo4j.io",
        ignoreFocusOut: true,
    });
    if (!uri) {
        return;
    }
    try {
        const connection = (0, utils_1.extractCredentials)(uri);
        if (!connection) {
            return;
        }
        const username = await vscode_1.window.showInputBox({
            prompt: "Username?",
            placeHolder: "eg. neo4j",
            ignoreFocusOut: true,
            value: connection?.username || 'neo4j'
        });
        if (!username) {
            return;
        }
        const password = await vscode_1.window.showInputBox({
            prompt: "Password?",
            placeHolder: "********",
            password: true,
            ignoreFocusOut: true,
            value: connection?.password
        });
        if (!password) {
            return;
        }
        // Save Connection
        await connections.add({
            ...connection,
            username,
            password,
        });
    }
    catch (e) {
        vscode_1.window.showInformationMessage(`Unable to parse ${uri}.\n ${e.getMessage()}`);
    }
}
exports.default = addAuraConnection;
//# sourceMappingURL=add-aura-connection.js.map