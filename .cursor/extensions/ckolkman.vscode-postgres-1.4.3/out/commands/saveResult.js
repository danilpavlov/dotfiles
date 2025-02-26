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
exports.saveResultCommand = void 0;
const baseCommand_1 = require("../common/baseCommand");
const vscode = require("vscode");
const EasyXml = require("easyxml");
const csv = require("csv-stringify");
const global_1 = require("../common/global");
const formatting_1 = require("../common/formatting");
class saveResultCommand extends baseCommand_1.default {
    run(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = global_1.Global.ResultManager.activeWinResults;
            if (!results) {
                vscode.window.showWarningMessage('Unable to save data - dataset not found');
                return;
            }
            let resultIndex = 0;
            if (results.length > 1) {
                let tables = [];
                for (let i = 1; i <= results.length; i++) {
                    tables.push({
                        label: 'Table ' + i,
                        index: i - 1
                    });
                }
                let selected = yield vscode.window.showQuickPick(tables);
                if (!selected)
                    return;
                resultIndex = selected.index;
            }
            if (results[resultIndex].rowCount < 1) {
                vscode.window.showWarningMessage('Unable to save data - table has no data');
                return;
            }
            let formats = ['json', 'xml', 'csv'];
            let selFormat = yield vscode.window.showQuickPick(formats);
            if (!selFormat)
                return;
            let fileData = null;
            if (selFormat === 'json') {
                let data = transformResult(results[resultIndex], true);
                fileData = JSON.stringify(data, null, 2);
            }
            else if (selFormat === 'xml') {
                var ser = new EasyXml({
                    singularize: true,
                    rootElement: 'results',
                    dateFormat: 'ISO',
                    manifest: true
                });
                let data = transformResult(results[resultIndex], true);
                fileData = ser.render(data);
            }
            else if (selFormat === 'csv') {
                let columns = transformColumns(results[resultIndex].fields);
                let csvError = false;
                fileData = yield new Promise((resolve) => {
                    csv(results[resultIndex].rows, {
                        header: true,
                        columns: columns,
                        cast: {
                            boolean: (value) => {
                                return value ? 'true' : 'false';
                            },
                            date: (value, context) => {
                                if (context.header)
                                    return value;
                                let fieldInfo = results[resultIndex].fields[context.index];
                                return formatting_1.formatFieldValue(fieldInfo, value, true);
                            }
                        }
                    }, (err, output) => {
                        if (err) {
                            csvError = err;
                            resolve('');
                            return;
                        }
                        resolve(output);
                    });
                });
            }
            try {
                let doc = yield vscode.workspace.openTextDocument({ language: selFormat });
                let editor = yield vscode.window.showTextDocument(doc, 1, false);
                let result = yield editor.edit(edit => edit.insert(new vscode.Position(0, 0), fileData));
                if (!result)
                    vscode.window.showErrorMessage('Error occurred opening content in editor');
            }
            catch (err) {
                vscode.window.showErrorMessage(err);
            }
        });
    }
}
exports.saveResultCommand = saveResultCommand;
function transformResult(result, raw) {
    let columns = transformColumns(result.fields);
    return result.rows.map((row) => transformData(columns, row, raw));
}
function transformData(fields, row, raw) {
    let newRow = {};
    fields.forEach(field => {
        newRow[field.name] = formatting_1.formatFieldValue(field, row[field.index], raw);
    });
    return newRow;
}
function transformColumns(fields) {
    let transformedFields = [];
    let fieldCounts = {};
    fields.forEach((field, idx) => {
        if (fieldCounts.hasOwnProperty(field.name)) {
            fieldCounts[field.name]++;
            transformedFields.push(Object.assign(Object.assign({}, field), { name: field.name + '_' + fieldCounts[field.name], header: field.name, key: field.name, index: idx }));
        }
        else {
            fieldCounts[field.name] = 0;
            transformedFields.push(Object.assign(Object.assign({}, field), { header: field.name, key: field.name, index: idx }));
        }
    });
    return transformedFields;
}
//# sourceMappingURL=saveResult.js.map