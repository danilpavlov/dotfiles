"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const output_1 = require("../output");
const utils_1 = require("../utils");
const result_utils_1 = require("./result.utils");
class ResultWindow {
    constructor(context, parameters, connection, cypher, method) {
        this.context = context;
        this.parameters = parameters;
        this.connection = connection;
        this.cypher = cypher;
        this.panel = vscode_1.window.createWebviewPanel("neo4j.result", cypher, vscode_1.ViewColumn.Two, { retainContextWhenHidden: true });
        this.run(method);
    }
    async run(method) {
        const driver = (0, utils_1.getDriverForConnection)(this.connection);
        // Get parameter list
        const params = await this.parameters.asParameters();
        // Start output
        output_1.default.append('--');
        output_1.default.append(`${method} on database ${this.connection.database || 'neo4j'}`);
        output_1.default.append(this.cypher);
        output_1.default.append(JSON.stringify(params, null, 2));
        // Session Options
        const options = {};
        if (this.connection.database && this.connection.database !== null) {
            options.database = this.connection.database;
        }
        const session = driver.session(options);
        try {
            // Loading
            this.panel.webview.html = (0, result_utils_1.getLoadingContent)(this.cypher, params);
            // Run it
            const res = await session[method](tx => tx.run(this.cypher, params));
            // Show results in webframe
            this.panel.webview.html = (0, result_utils_1.getResultContent)(this.cypher, params, res);
        }
        catch (e) {
            // Output error in neo4j channel
            output_1.default.append('Error Running Query');
            output_1.default.append(e.message);
            output_1.default.show();
            // Update Webview
            this.panel.webview.html = (0, result_utils_1.getErrorContent)(this.cypher, params, e);
        }
        finally {
            // Close the session
            await driver.close();
        }
    }
}
exports.default = ResultWindow;
//# sourceMappingURL=result-window.class.js.map