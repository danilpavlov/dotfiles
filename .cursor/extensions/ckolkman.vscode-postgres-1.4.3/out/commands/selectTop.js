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
exports.selectTopCommand = void 0;
const baseCommand_1 = require("../common/baseCommand");
const vscode = require("vscode");
const editorState_1 = require("../common/editorState");
const database_1 = require("../common/database");
const global_1 = require("../common/global");
const queries_1 = require("../queries");
class selectTopCommand extends baseCommand_1.default {
    run(treeNode, count = 0, withNames = false, runOnly = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (count === 0) {
                // prompt for count
                const countInput = yield vscode.window.showInputBox({ prompt: "Select how many rows?", placeHolder: "limit" });
                if (!countInput)
                    return;
                count = parseInt(countInput);
                if (Number.isNaN(count)) {
                    vscode.window.showErrorMessage('Invalid quantity for selection - should be a number');
                    return;
                }
            }
            let columnsToSelect = ['*'];
            if (withNames) {
                const connection = yield database_1.Database.createConnection(treeNode.connection);
                const configSort = global_1.Global.Configuration.get("tableColumnSortOrder");
                const sortOptions = {
                    "db-order": 'a.attnum',
                    "alpha": 'a.attname',
                    "reverse-alpha": 'a.attname DESC'
                };
                if (!sortOptions[configSort])
                    sortOptions[configSort] = 'a.attnum';
                let tableSchema = (_a = treeNode.schema) !== null && _a !== void 0 ? _a : 'public';
                let query = queries_1.SqlQueryManager.getVersionQueries(connection.pg_version);
                try {
                    let res = null;
                    res = yield connection.query(query.format(query.TableColumns, sortOptions[configSort]), [
                        treeNode.getQuotedTableName(),
                        treeNode.connection.database,
                        tableSchema,
                        treeNode.table
                    ]);
                    columnsToSelect = res.rows.map(column => database_1.Database.getQuotedIdent(column.column_name));
                }
                catch (err) {
                    return err;
                }
                finally {
                    yield connection.end();
                }
            }
            const sql = `SELECT ${columnsToSelect.join(', ')} FROM ${treeNode.getQuotedTableName()} LIMIT ${count};`;
            if (!runOnly) {
                const textDocument = yield vscode.workspace.openTextDocument({ content: sql, language: 'postgres' });
                yield vscode.window.showTextDocument(textDocument);
                editorState_1.EditorState.connection = treeNode.connection;
            }
            return database_1.Database.runQuery(sql, vscode.window.activeTextEditor, treeNode.connection, runOnly);
        });
    }
}
exports.selectTopCommand = selectTopCommand;
//# sourceMappingURL=selectTop.js.map