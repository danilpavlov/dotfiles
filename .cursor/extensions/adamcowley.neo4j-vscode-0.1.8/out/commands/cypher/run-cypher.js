"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
async function runCypher(connections, cypherRunner, method) {
    // Get the active text editor
    const editor = vscode_1.window.activeTextEditor;
    //  TODO: Only get selection
    if (editor) {
        // Get the active connection
        const activeConnection = await connections.getActive();
        if (!activeConnection) {
            vscode_1.window.showErrorMessage(`No active connection`);
            return;
        }
        const selections = editor.selections
            .filter(selection => !selection.isEmpty
            && editor.document.getText(selection));
        // Attempt to run entire file
        if (selections.length === 0) {
            const documentText = editor.document.getText();
            await cypherRunner.run(activeConnection, documentText, method);
            return;
        }
        // For each selection:
        await Promise.all(selections.map(async (selection) => {
            const documentText = editor.document.getText(selection);
            await cypherRunner.run(activeConnection, documentText, method);
        }));
    }
}
exports.default = runCypher;
//# sourceMappingURL=run-cypher.js.map