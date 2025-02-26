"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
async function addConnection(connections) {
    const dotEnv = await (0, utils_1.extractCredentialsFromActiveEditor)();
    if (dotEnv.scheme && dotEnv.host && dotEnv.port
        && dotEnv.username && dotEnv.password) {
        await connections.add({
            ...dotEnv,
            active: false,
        });
        return;
    }
    // Ask the user for options
    const scheme = await vscode_1.window.showQuickPick(constants_1.schemes, { placeHolder: `Which scheme would you like to connect with?` });
    if (!scheme) {
        return;
    }
    const host = await vscode_1.window.showInputBox({
        prompt: "Host?",
        placeHolder: "eg. localhost",
        value: dotEnv.host,
        ignoreFocusOut: true
    });
    if (!host) {
        return;
    }
    const port = await vscode_1.window.showInputBox({
        prompt: "Port?",
        placeHolder: "eg. 7687",
        value: dotEnv.port,
        ignoreFocusOut: true
    }) || '7687';
    const username = await vscode_1.window.showInputBox({
        prompt: "Username?",
        placeHolder: "eg. neo4j",
        value: dotEnv.username,
        ignoreFocusOut: true
    }) || 'neo4j';
    if (!username) {
        return;
    }
    const password = await vscode_1.window.showInputBox({
        prompt: "Password?",
        password: true,
        value: dotEnv.password,
        placeHolder: "********",
        ignoreFocusOut: true
    });
    if (!password) {
        return;
    }
    const database = await vscode_1.window.showInputBox({
        prompt: "Default Database?",
        placeHolder: "Optional",
        value: dotEnv.database || undefined,
        ignoreFocusOut: true
    });
    await connections.add({
        scheme,
        host,
        port,
        username,
        password,
        database,
        active: false,
    });
}
exports.default = addConnection;
//# sourceMappingURL=add-connection.js.map