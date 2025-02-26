"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("../../utils");
async function openNeo4jBrowser(connections, selected) {
    const state = connections.getState();
    if (selected === undefined) {
        const id = await vscode_1.window.showQuickPick(Object.keys(state), { placeHolder: 'Choose active connection?' });
        if (id === undefined) {
            return;
        }
        selected = state[id];
    }
    if (selected) {
        const secure = selected.scheme.endsWith('+s') || selected.scheme.endsWith('+ssc');
        const port = (0, utils_1.isAuraConnection)(selected.host) ? '' : `:7474`;
        vscode_1.env.openExternal(vscode_1.Uri.parse(`http${secure ? 's' : ''}://${selected.host}${port}`));
    }
}
exports.default = openNeo4jBrowser;
//# sourceMappingURL=open-neo4j-browser.js.map