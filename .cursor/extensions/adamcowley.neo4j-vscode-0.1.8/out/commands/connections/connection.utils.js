"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionDetailsFromActiveEditor = void 0;
const vscode_1 = require("vscode");
const utils_1 = require("../../utils");
async function getConnectionDetailsFromActiveEditor() {
    // Check current file for .env
    let envScheme, envHost, envPort, envUsername, envPassword, envDatabase;
    if (vscode_1.window.activeTextEditor) {
        const text = vscode_1.window.activeTextEditor.document.getText();
        if (text?.includes('NEO4J_URI')) {
            const matchUri = text.match(/NEO4J_URI=(.*)/);
            const matchUsername = text.match(/NEO4J_USERNAME=(.*)/);
            const matchPassword = text.match(/NEO4J_PASSWORD=(.*)/);
            if (matchUri) {
                try {
                    const res = (0, utils_1.extractCredentials)(matchUri[1]);
                    envScheme = res?.scheme;
                    envHost = res?.host;
                    envPort = res?.port;
                    envDatabase = res?.database;
                }
                catch (e) { }
            }
            if (matchUsername) {
                envUsername = matchUsername[1].trim();
            }
            if (matchPassword) {
                envPassword = matchPassword[1].trim();
            }
            return {
                scheme: envScheme,
                host: envHost,
                port: envPort,
                username: envUsername,
                password: envPassword,
                database: envDatabase,
            };
        }
    }
    return {};
}
exports.getConnectionDetailsFromActiveEditor = getConnectionDetailsFromActiveEditor;
//# sourceMappingURL=connection.utils.js.map