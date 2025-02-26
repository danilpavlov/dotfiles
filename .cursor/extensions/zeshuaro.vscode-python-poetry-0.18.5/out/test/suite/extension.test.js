"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const sinon_1 = require("sinon");
const vscode_1 = require("vscode");
const extension_1 = require("../../extension");
const extension_service_1 = require("../../extension-service");
const poetry_service_1 = require("../../poetry-service");
const pypi_1 = require("../../pypi");
const pypi_service_1 = require("../../pypi/pypi-service");
suite("Extension", () => {
    const numExtensions = 12;
    let context;
    let subscriptions;
    let registerCommand;
    (0, mocha_1.beforeEach)(() => {
        subscriptions = [];
        context = { subscriptions };
        (0, sinon_1.stub)(pypi_1.PypiClient, "default");
        (0, sinon_1.stub)(pypi_service_1.PypiService.prototype);
        (0, sinon_1.stub)(poetry_service_1.PoetryService.prototype);
        (0, sinon_1.stub)(extension_service_1.ExtensionService.prototype);
        registerCommand = (0, sinon_1.stub)(vscode_1.commands, "registerCommand");
    });
    (0, mocha_1.afterEach)(() => {
        (0, sinon_1.restore)();
    });
    test("activate", async () => {
        (0, extension_1.activate)(context);
        sinon_1.assert.match(subscriptions.length, numExtensions);
        sinon_1.assert.callCount(registerCommand, numExtensions);
    });
});
//# sourceMappingURL=extension.test.js.map