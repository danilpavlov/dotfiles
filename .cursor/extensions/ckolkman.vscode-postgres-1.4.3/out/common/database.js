"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs = require("fs");
const vscode = require("vscode");
const path = require("path");
// import { Pool, Client, types, ClientConfig } from 'pg';
const connection_1 = require("./connection");
const outputChannel_1 = require("./outputChannel");
const perf_hooks_1 = require("perf_hooks");
;
;
;
let queryCounter = 0;
class Database {
    // could probably be simplified, essentially matches Postgres' built-in algorithm without the char pointers
    static getQuotedIdent(name) {
        let result = '"';
        for (let i = 0; i < name.length; i++) {
            if (name.charAt(i) === '"')
                result += name.charAt(i);
            result += name.charAt(i);
        }
        return result + '"';
    }
    static getConnectionWithDB(connection, dbname) {
        if (!dbname)
            return connection;
        return {
            label: connection.label,
            host: connection.host,
            user: connection.user,
            password: connection.password,
            port: connection.port,
            database: dbname,
            multipleStatements: connection.multipleStatements,
            certPath: connection.certPath
        };
    }
    static createConnection(connection, dbname) {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionOptions = Object.assign({}, connection);
            connectionOptions.database = dbname ? dbname : connection.database;
            if (connectionOptions.certPath && fs.existsSync(connectionOptions.certPath)) {
                connectionOptions.ssl = {
                    ca: fs.readFileSync(connectionOptions.certPath).toString(),
                    rejectUnauthorized: false,
                };
            }
            if (connectionOptions.ssl === true) {
                connectionOptions.ssl = { rejectUnauthorized: false };
            }
            let client = new connection_1.PgClient(connectionOptions);
            yield client.connect();
            const versionRes = yield client.query(`SELECT current_setting('server_version_num') as ver_num;`);
            /*
            return res.rows.map<ColumnNode>(column => {
              return new ColumnNode(this.connection, this.table, column);
            });
            */
            let versionNumber = parseInt(versionRes.rows[0].ver_num);
            client.pg_version = versionNumber;
            return client;
        });
    }
    static getDurationText(milliseconds) {
        let sec = milliseconds / 1000.0;
        // More than 60 sec -> 2 min 5 sec
        if (sec > 60) {
            let min = Math.floor(sec / 60);
            sec = Math.round(sec - min * 60);
            return String(min) + ' min ' + String(Math.round(sec)) + 'sec';
        }
        // More than 10 sec -> 33 sec.
        if (sec >= 20) {
            sec = Math.round(sec);
            return String(sec) + ' sec';
        }
        // More than 2 sec -> 3.3 sec.
        else if (sec > 2) {
            sec = Math.round(sec * 10) / 10;
            return String(sec) + ' sec';
        }
        // More than 0.1 sec -> 0.33 sec.
        else if (sec > 0.1) {
            sec = Math.round(sec * 100) / 100;
            return String(sec) + ' sec';
        }
        // Full precision
        sec = Math.round(sec * 1000) / 1000;
        return String(sec) + ' sec';
    }
    static runQuery(sql, editor, connectionOptions, showInCurrentPanel = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // let uri = editor.document.uri.toString();
            // let title = path.basename(editor.document.fileName);
            // let resultsUri = vscode.Uri.parse('postgres-results://' + uri);
            let uri = '';
            let title = '';
            if (showInCurrentPanel) {
                queryCounter++;
                uri = `unnamed-query-${queryCounter}`;
                title = `Unnamed Query ${queryCounter}`;
            }
            else {
                uri = editor.document.uri.toString();
                title = path.basename(editor.document.fileName);
            }
            let resultsUri = vscode.Uri.parse('postgres-results://' + uri);
            outputChannel_1.OutputChannel.displayMessage(resultsUri, 'Results: ' + title, 'Waiting for the query to complete...', showInCurrentPanel);
            let connection = null;
            try {
                let startTime = perf_hooks_1.performance.now();
                connection = yield Database.createConnection(connectionOptions);
                const typeNamesQuery = `select oid, format_type(oid, typtypmod) as display_type, typname from pg_type`;
                const types = yield connection.query(typeNamesQuery);
                const res = yield connection.query({ text: sql, rowMode: 'array' });
                const results = Array.isArray(res) ? res : [res];
                let durationText = Database.getDurationText(perf_hooks_1.performance.now() - startTime);
                outputChannel_1.OutputChannel.displayMessage(resultsUri, 'Results: ' + title, 'Query completed in ' + durationText + '. Building results view...', showInCurrentPanel);
                vscode.window.showInformationMessage('Query completed in ' + durationText + '.');
                results.forEach((result) => {
                    result.fields.forEach((field) => {
                        let type = types.rows.find((t) => t.oid === field.dataTypeID);
                        if (type) {
                            field.format = type.typname;
                            field.display_type = type.display_type;
                        }
                    });
                });
                outputChannel_1.OutputChannel.displayResults(resultsUri, 'Results: ' + title, results, showInCurrentPanel);
                if (!showInCurrentPanel) {
                    vscode.window.showTextDocument(editor.document, editor.viewColumn);
                }
            }
            catch (err) {
                outputChannel_1.OutputChannel.displayMessage(resultsUri, 'Results: ' + title, 'ERROR: ' + err.message, showInCurrentPanel);
                outputChannel_1.OutputChannel.appendLine(err);
                vscode.window.showErrorMessage(err.message);
                // vscode.window.showErrorMessage(err.message, "Show Console").then((button) => {
                //   if (button === 'Show Console') {
                //     OutputChannel.show();
                //   }
                // });
            }
            finally {
                if (connection)
                    yield connection.end();
            }
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map