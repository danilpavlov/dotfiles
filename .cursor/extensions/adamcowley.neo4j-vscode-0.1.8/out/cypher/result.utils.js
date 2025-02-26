"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultContent = exports.getErrorContent = exports.getLoadingContent = void 0;
const utils_1 = require("../utils");
function getLoadingContent(cypher, params) {
    return wrapper(cypher, params, `
    <p>Running query, please wait...</p>
  `);
}
exports.getLoadingContent = getLoadingContent;
function getErrorContent(cypher, params, err) {
    return wrapper(cypher, params, `
    <details class="error">
      <summary style="color:red">Error: ${err.message}</summary>
      <pre>${err.stack}</pre>
    </details>
  `);
}
exports.getErrorContent = getErrorContent;
function getResultContent(cypher, params, res) {
    return wrapper(cypher, params, `
    ${renderTable(res)}

    <div class="summary">${(0, utils_1.querySummary)(res).map(str => `<p>${str}</p>`).join('\n')}</div>
  `);
}
exports.getResultContent = getResultContent;
function wrapper(cypher, params, content) {
    return `
    <html>
      <head>
      <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
      <style>
      :root {
        --background: #f2f2f2;
        --border: #ccc;
        --text: #000;
        --error: #ff0000;
      }

      @media (prefers-color-scheme: dark) {
        --background: transparent;
        --border: #ddd;
        --text: #ccc;
        --error: #bbb;
      }

      table{border-collapse:collapse; width: 100%}
      table,td,th{border:1px solid var(--border); padding:5px; vertical-align: top}
      th {font-weight: bold}
      details {margin-bottom: 24px; padding: 12px; border: 1px solid var(--border)}
      details summary {border-bottom: 1px solid var(--border); padding: 6px}
      pre {
        max-height: 280px;
        overflow: auto;
      }

      .error {
        color: var(--border);
        border-color: var(--border);
      }
      </style>
      </head>
      <body>
        <details>
          <summary>Query Details</summary>
          <pre>${cypher}</pre>
          <pre>${JSON.stringify(params, null, 2)}</pre>
        </details>
        ${content}
      </body>
      </html>
    `;
}
function renderTable(res) {
    if (res.records.length === 0) {
        return `<p>No records returned</p>`;
    }
    return `
    <table>
      <thead>
      ${res.records[0].keys.map(key => `<th>${key.toString()}</th>`).join('')}
      </thead>
      <tbody>
        ${res.records.map(record => renderRow(record.keys, (0, utils_1.toNativeTypes)(record.toObject()))).join('\n')}
      </tbody>
    </table>
  `;
}
function renderRow(keys, row) {
    return `
    <tr>
      ${keys.map(key => {
        return `
            <td>
              <pre>${JSON.stringify(row[key], null, 2)}</pre>
            </td>
            `;
    }).join('')}
    </tr>
  `;
}
//# sourceMappingURL=result.utils.js.map