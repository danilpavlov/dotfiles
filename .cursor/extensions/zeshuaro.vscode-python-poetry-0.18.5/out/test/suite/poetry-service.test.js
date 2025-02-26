"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const sinon_1 = require("sinon");
const vscode_1 = require("vscode");
const poetry_service_1 = require("../../poetry-service");
const pypi_1 = require("../../pypi");
const types_1 = require("../../types");
suite("PoetryService", () => {
    const command = types_1.PoetryCommand.add;
    const packageName = "packageName";
    const group = "group";
    const optionValue = "optionValue";
    let pypiService;
    let sut;
    let terminal;
    let sendText;
    let createTerminal;
    let show;
    (0, mocha_1.beforeEach)(() => {
        terminal = {
            sendText: (_text, _addNewLine) => { },
            show: () => { },
            exitStatus: undefined,
        };
        sendText = (0, sinon_1.stub)(terminal, "sendText");
        show = (0, sinon_1.stub)(terminal, "show");
        createTerminal = (0, sinon_1.stub)(vscode_1.window, "createTerminal").returns(terminal);
        pypiService = (0, sinon_1.createStubInstance)(pypi_1.PypiService);
        sut = new poetry_service_1.PoetryService(pypiService);
    });
    (0, mocha_1.afterEach)(() => {
        (0, sinon_1.restore)();
    });
    test("install packages", async () => {
        await sut.installPackages();
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry install");
    });
    test("install packages ask options", async () => {
        const opts = poetry_service_1.PoetryService.installOptions;
        const numExtraPompts = opts.filter((opt) => opt.promptDescription).length;
        const showQuickPick = mockShowQuickPick(opts.map((opt) => opt.description));
        const showInputBox = mockShowInputBox(...Array(numExtraPompts).fill(optionValue));
        await sut.installPackages({ askOptions: true });
        sinon_1.assert.calledOnce(showQuickPick);
        sinon_1.assert.callCount(showInputBox, numExtraPompts);
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry install ${getMappedPoetryOptions(opts)}`);
    });
    test("install packages ask options without selections", async () => {
        const showQuickPick = mockShowQuickPick(undefined);
        await sut.installPackages({ askOptions: true });
        sinon_1.assert.calledOnce(showQuickPick);
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry install");
    });
    test("install packages ask options prompt undefined", async () => {
        const opts = poetry_service_1.PoetryService.installOptions;
        const numExtraPompts = opts.filter((opt) => opt.promptDescription).length;
        const showQuickPick = mockShowQuickPick(opts.map((opt) => opt.description));
        const showInputBox = mockShowInputBox(...Array(numExtraPompts).fill(undefined));
        await sut.installPackages({ askOptions: true });
        sinon_1.assert.calledOnce(showQuickPick);
        sinon_1.assert.callCount(showInputBox, numExtraPompts);
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry install ${opts
            .filter((opt) => !("promptDescription" in opt))
            .map((opt) => opt.value)
            .join(" ")}`);
    });
    test("install packages unknown option", async () => {
        const showQuickPick = mockShowQuickPick(["clearlyRandomOption"]);
        await sut.installPackages({ askOptions: true });
        sinon_1.assert.calledOnce(showQuickPick);
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry install");
    });
    test("add packages", async () => {
        const promptPackageNameWithSearch = mockPromptPackageNameWithSearch(packageName);
        await sut.managePackages({ command });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry ${command} ${packageName}`);
        sinon_1.assert.calledOnce(promptPackageNameWithSearch);
    });
    test("remove packages", async () => {
        const command = types_1.PoetryCommand.remove;
        const showInputBox = mockShowInputBox(packageName);
        await sut.managePackages({ command });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry ${command} ${packageName}`);
        sinon_1.assert.calledOnce(showInputBox);
    });
    test("manage packages without package name", async () => {
        const promptPackageNameWithSearch = mockPromptPackageNameWithSearch(undefined);
        await sut.managePackages({ command });
        sinon_1.assert.notCalled(show);
        sinon_1.assert.notCalled(sendText);
        sinon_1.assert.calledOnce(promptPackageNameWithSearch);
    });
    test("manage dev packages", async () => {
        const promptPackageNameWithSearch = mockPromptPackageNameWithSearch(packageName);
        await sut.managePackages({ command, isDev: true });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry ${command} ${packageName} --dev`);
        sinon_1.assert.calledOnce(promptPackageNameWithSearch);
    });
    test("manage packages with group", async () => {
        const promptPackageNameWithSearch = mockPromptPackageNameWithSearch(packageName);
        const showInputBox = mockShowInputBox(group);
        await sut.managePackages({ command, askGroup: true });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry ${command} ${packageName} --group ${group}`);
        sinon_1.assert.calledOnce(promptPackageNameWithSearch);
        sinon_1.assert.calledOnce(showInputBox);
    });
    test("manage packages with undefined group", async () => {
        const promptPackageNameWithSearch = mockPromptPackageNameWithSearch(packageName);
        const showInputBox = mockShowInputBox(undefined);
        await sut.managePackages({ command, askGroup: true });
        sinon_1.assert.notCalled(show);
        sinon_1.assert.notCalled(sendText);
        sinon_1.assert.calledOnce(promptPackageNameWithSearch);
        sinon_1.assert.calledOnce(showInputBox);
    });
    test("manage packages with empty string group", async () => {
        const promptPackageNameWithSearch = mockPromptPackageNameWithSearch(packageName);
        const showInputBox = mockShowInputBox("");
        await sut.managePackages({ command, askGroup: true });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry ${command} ${packageName}`);
        sinon_1.assert.calledOnce(promptPackageNameWithSearch);
        sinon_1.assert.calledOnce(showInputBox);
    });
    test("update packages", async () => {
        await sut.updatePackages();
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry update");
    });
    test("update packages ask options", async () => {
        const opts = poetry_service_1.PoetryService.updateOptions;
        const numExtraPompts = opts.filter((opt) => opt.promptDescription).length;
        const showQuickPick = mockShowQuickPick(opts.map((opt) => opt.description));
        const showInputBox = mockShowInputBox(...Array(numExtraPompts).fill(optionValue));
        await sut.updatePackages({ askOptions: true });
        sinon_1.assert.calledOnce(showQuickPick);
        sinon_1.assert.callCount(showInputBox, numExtraPompts);
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry update ${getMappedPoetryOptions(opts)}`);
    });
    test("update packages ask options without selections", async () => {
        const showQuickPick = mockShowQuickPick(undefined);
        await sut.updatePackages({ askOptions: true });
        sinon_1.assert.calledOnce(showQuickPick);
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry update");
    });
    test("update packages no dev", async () => {
        await sut.updatePackages({ noDev: true });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry update --no-dev");
    });
    test("update packages with package name", async () => {
        const showInputBox = mockShowInputBox(packageName);
        await sut.updatePackages({ askPackageName: true });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, `poetry update ${packageName}`);
        sinon_1.assert.calledOnce(showInputBox);
    });
    test("update packages without package name", async () => {
        const showInputBox = mockShowInputBox(undefined);
        await sut.updatePackages({ askPackageName: true });
        sinon_1.assert.notCalled(show);
        sinon_1.assert.notCalled(sendText);
        sinon_1.assert.calledOnce(showInputBox);
    });
    test("lock packages", () => {
        sut.lockPackages();
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry lock");
    });
    test("lock packages no update", () => {
        sut.lockPackages({ noUpdate: true });
        sinon_1.assert.calledOnce(show);
        sinon_1.assert.calledWith(sendText, "poetry lock --no-update");
    });
    test("terminal active", () => {
        sut.lockPackages();
        sut.lockPackages();
        sinon_1.assert.calledOnce(createTerminal);
    });
    test("terminal inactive", () => {
        vscode_1.window.createTerminal.restore();
        terminal = {
            sendText: (_text, _addNewLine) => { },
            show: () => { },
            exitStatus: {},
        };
        const createTerminal = (0, sinon_1.stub)(vscode_1.window, "createTerminal").returns(terminal);
        sut.lockPackages();
        sut.lockPackages();
        sinon_1.assert.calledTwice(createTerminal);
    });
    function mockShowQuickPick(values) {
        const showQuickPick = (0, sinon_1.stub)(vscode_1.window, "showQuickPick");
        showQuickPick.returns(Promise.resolve(values));
        return showQuickPick;
    }
    function mockShowInputBox(...values) {
        const showInputBox = (0, sinon_1.stub)(vscode_1.window, "showInputBox");
        values.forEach((value, index) => {
            showInputBox.onCall(index).returns(Promise.resolve(value));
        });
        return showInputBox;
    }
    function mockPromptPackageNameWithSearch(value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (0, sinon_1.stub)(sut, "promptPackageNameWithSearch").returns(value);
    }
    function getMappedPoetryOptions(options) {
        return options
            .map((opt) => {
            if (opt.promptDescription) {
                return `${opt.value} ${optionValue}`;
            }
            return opt.value;
        })
            .join(" ");
    }
});
//# sourceMappingURL=poetry-service.test.js.map