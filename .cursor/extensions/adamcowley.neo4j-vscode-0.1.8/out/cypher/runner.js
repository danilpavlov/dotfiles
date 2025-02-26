"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_1 = require("../output");
const set_parameter_value_1 = require("../commands/parameters/set-parameter-value");
const result_window_class_1 = require("./result-window.class");
const utils_1 = require("../utils");
class CypherRunner {
    constructor(context, connections, parameters) {
        this.context = context;
        this.connections = connections;
        this.parameters = parameters;
        this.results = new Map();
    }
    async run(connection, input, method) {
        // Split text on ; and a new line
        const queries = input.split(';\n');
        // Run individual queries
        for (const query of queries) {
            if (query && query !== '') {
                await this.runSingle(connection, query.trim(), method);
            }
        }
    }
    async runSingle(connection, cypher, method) {
        const driver = (0, utils_1.getDriverForConnection)(connection);
        try {
            // Detect Missing Parameters
            const parameters = cypher.match(/\$([a-z0-9_]+)/gi);
            if (parameters) {
                for (const parameter of parameters) {
                    if (!this.parameters.has(parameter.substring(1))) {
                        await (0, set_parameter_value_1.default)(this.parameters, parameter.substring(1));
                    }
                }
            }
            // Check for existing query result window
            const key = Buffer.from(cypher).toString('base64');
            if (this.results.has(key)) {
                return this.results.get(key).run(method);
            }
            const resultWindow = new result_window_class_1.default(this.context, this.parameters, connection, cypher, method);
            // Add to map
            this.results.set(key, resultWindow);
            // Remove on close
            resultWindow.panel.onDidDispose(() => this.results.delete(key));
            // Run the query
            return resultWindow.run(method);
        }
        catch (e) {
            output_1.default.append('Error Running Query');
            output_1.default.append(e.message);
            output_1.default.show();
        }
        finally {
            await driver.close();
        }
    }
}
exports.default = CypherRunner;
//# sourceMappingURL=runner.js.map