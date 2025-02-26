"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class OutputChannel {
    static append(value) {
        // OutputChannel.channel.show(true);
        OutputChannel.channel.appendLine(value);
    }
    static show() {
        OutputChannel.channel.show(true);
    }
}
exports.default = OutputChannel;
OutputChannel.channel = vscode.window.createOutputChannel("Neo4j");
//# sourceMappingURL=output.js.map