'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = void 0;
const vscode = require("vscode");
const constants_1 = require("./constants");
class Global {
    static get Configuration() {
        return vscode.workspace.getConfiguration(constants_1.Constants.ExtensionId);
    }
}
exports.Global = Global;
Global.context = null;
Global.ResultManager = null;
//# sourceMappingURL=global.js.map