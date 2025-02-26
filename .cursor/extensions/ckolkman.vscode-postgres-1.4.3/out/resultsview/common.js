"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResultsHtml = exports.disposeAll = void 0;
const vscode = require("vscode");
const path = require("path");
const global_1 = require("../common/global");
const formatting_1 = require("../common/formatting");
function disposeAll(disposables) {
    while (disposables.length) {
        const item = disposables.pop();
        if (!item)
            continue;
        item.dispose();
    }
}
exports.disposeAll = disposeAll;
function generateResultsHtml(webview, sourceUri, results, state) {
    let pageScript = getExtensionResourcePath('index.js', webview);
    const nonce = new Date().getTime() + '' + new Date().getMilliseconds();
    let html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta id="vscode-postgres-results-data"
        data-settings=""
        data-state="${JSON.stringify(state || {}).replace(/"/g, '&quot;')}" />
      <script src="${pageScript}" nonce="${nonce}"></script>
      ${getStyles(nonce)}
    </head>
    <body class="vscode-body">
      ${getResultsTables(results)}
    </body>
  </html>`;
    return html;
}
exports.generateResultsHtml = generateResultsHtml;
function getStyles(nonce) {
    let config = global_1.Global.Configuration;
    let prettyJsonFieldStyle = '';
    if (config.get('prettyPrintJSONfields')) {
        prettyJsonFieldStyle = `
    .jsonb-field, .json-field {
      white-space: pre;
    }
    `;
    }
    return `<style nonce="${nonce}">
    body {
      margin: 0;
      padding: 0;
    }

    pre.vscode-postgres-result {
      margin: 5px;
    }
    
    pre.vscode-postgres-result-insert {
    
    }
    
    pre.vscode-postgres-result-update {
      
    }
    
    pre.vscode-postgres-result-create {
      
    }
    
    pre.vscode-postgres-result-delete {
      
    }
    
    pre.vscode-postgres-result-explain {
      
    }
    
    pre.vscode-postgres-result-generic {
      
    }
    
    pre.vscode-postgres-result-message {
      
    }

    pre.vscode-postgres-result-select {
      
    }

    .field-type {
      font-size: smaller;
    }

    ${prettyJsonFieldStyle}
    
    table {
      border-collapse: collapse;
    }

    thead th {
      position: sticky;
      top: -1px;
      background-color: var(--vscode-editor-background, var(--theme-background));
    }

    thead th::after {
      content: '';
      position: absolute;
      top: -1px;
      right: -1px;
      left: -1px;
      height: 100%;
      border: 1px solid var(--vscode-panel-border);
      pointer-events: none;
    }
    
    th, td {
      border-width: 1px;
      border-style: solid;
      border-color: var(--vscode-panel-border);
      padding: 3px 5px;
    }
    
    .timestamptz-field { white-space: nowrap; }

    .result-divider {
      padding: 0;
      border: none;
      border-top: medium double var(--vscode-panel-border);
    }
  </style>`;
}
function getExtensionResourcePath(mediaFile, webview) {
    let filePath = path.join('media', mediaFile);
    let absFilePath = global_1.Global.context.asAbsolutePath(filePath);
    let uri = vscode.Uri.file(absFilePath);
    let url = webview.asWebviewUri(uri);
    return url.toString();
}
function getResultsTables(results) {
    let html = '', first = true;
    for (const result of results) {
        if (!first)
            html += '<hr class="result-divider" />';
        switch (result.command) {
            case 'ext-message':
                html += generateMessage(result);
                break;
            case 'INSERT':
                html += generateInsertResults(result);
                break;
            case 'UPDATE':
                html += generateUpdateResults(result);
                break;
            case 'CREATE':
                html += generateCreateResults(result);
                break;
            case 'DELETE':
                html += generateDeleteResults(result);
                break;
            case 'EXPLAIN':
                html += generateExplainResult(result);
                break;
            case 'SELECT':
                html += generateSelectResult(result);
                break;
            default:
                html += generateGenericResult(result);
                break;
        }
        first = false;
    }
    return html;
}
function generateInsertResults(result) {
    let html = getRowCountResult(result.rowCount, 'inserted', 'insert');
    if (result.fields && result.fields.length && result.rows && result.rows.length)
        html += generateSelectTableResult(result);
    return html;
}
function generateUpdateResults(result) {
    let html = getRowCountResult(result.rowCount, 'updated', 'update');
    if (result.fields && result.fields.length && result.rows && result.rows.length)
        html += generateSelectTableResult(result);
    return html;
}
function generateCreateResults(result) {
    return getRowCountResult(result.rowCount, 'created', 'create');
}
function generateDeleteResults(result) {
    let html = getRowCountResult(result.rowCount, 'deleted', 'delete');
    if (result.fields && result.fields.length && result.rows && result.rows.length)
        html += generateSelectTableResult(result);
    return html;
}
function getRowCountResult(rowCount, text, preClass) {
    let rowOrRows = rowCount === 1 ? 'row' : 'rows';
    return `<pre class="vscode-postgres-result vscode-postgres-result-${preClass}">${rowCount} ${rowOrRows} ${text}</pre>`;
}
function generateExplainResult(result) {
    return `<pre class="vscode-postgres-result vscode-postgres-result-explain">${result.rows.join("\n")}</pre>`;
}
function generateGenericResult(result) {
    return `<pre class="vscode-postgres-result vscode-postgres-result-generic">${JSON.stringify(result)}</pre>`;
}
function generateMessage(result) {
    return `<pre class="vscode-postgres-result vscode-postgres-result-message">${result.message}</pre>`;
}
function generateSelectResult(result) {
    let html = getRowCountResult(result.rowCount, 'returned', 'select');
    html += generateSelectTableResult(result);
    return html;
}
function generateSelectTableResult(result) {
    let html = `<table>`;
    // first the colum headers
    html += `<thead><tr><th></th>`;
    for (const field of result.fields) {
        html += `<th><div class="field-name">${field.name}</div><div class="field-type">${field.display_type}</div></th>`;
    }
    html += `</tr></thead>`;
    // now the body
    let rowIndex = 1;
    html += `<tbody>`;
    if (result.rows && result.rows.length) {
        for (const row of result.rows) {
            html += `<tr><th class="row-header">${rowIndex++}</th>`;
            result.fields.forEach((field, idx) => {
                let formatted = formatting_1.formatFieldValue(field, row[idx], false);
                html += `<td class="${field.format}-field">${formatted ? formatted : ''}</td>`;
            });
            html += `</tr>`;
        }
    }
    html += `</tbody>`;
    html += `</table>`;
    return html;
}
function base64Entities(str) {
    let ret = atob(str);
    return ret;
}
//# sourceMappingURL=common.js.map