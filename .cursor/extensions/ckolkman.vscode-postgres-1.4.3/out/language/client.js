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
const path = require("path");
const vscode = require("vscode");
const node_1 = require("vscode-languageclient/node");
const editorState_1 = require("../common/editorState");
class PostgreSQLLanguageClient {
    constructor(context) {
        this.lang_server_ready = false;
        let serverModule = context.asAbsolutePath(path.join('out', 'language', 'server.js'));
        let debugOptions = { execArgv: ['--nolazy', '--inspect=6005'] };
        let serverOptions = {
            run: { module: serverModule, transport: node_1.TransportKind.ipc },
            debug: { module: serverModule, transport: node_1.TransportKind.ipc, options: debugOptions }
        };
        let clientOptions = {
            documentSelector: [
                { language: 'postgres', scheme: 'file' },
                { language: 'postgres', scheme: 'untitled' }
            ]
        };
        this.client = new node_1.LanguageClient('postgres', 'PostgreSQL Service', serverOptions, clientOptions);
        this.client.onReady().then(() => __awaiter(this, void 0, void 0, function* () {
            this.lang_server_ready = true;
            editorState_1.EditorState.connection = yield editorState_1.EditorState.getDefaultConnection();
        }));
        let disposable = this.client.start();
        context.subscriptions.push(disposable);
    }
    setConnection(connection) {
        if (!vscode.window.activeTextEditor)
            return;
        if (!this.lang_server_ready) {
            this.client.onReady().then(() => __awaiter(this, void 0, void 0, function* () {
                this.doSetConnection(connection);
            }));
        }
        else {
            this.doSetConnection(connection);
        }
    }
    doSetConnection(connection) {
        this.client.sendRequest('set_connection', { connection, documentUri: vscode.window.activeTextEditor.document.uri.toString() })
            .then(() => { }, (reason) => {
            console.error(reason);
        });
    }
}
exports.default = PostgreSQLLanguageClient;
//# sourceMappingURL=client.js.map