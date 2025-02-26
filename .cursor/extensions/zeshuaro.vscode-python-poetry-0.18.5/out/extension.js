"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
const extension_service_1 = require("./extension-service");
const poetry_service_1 = require("./poetry-service");
const pypi_1 = require("./pypi");
function activate(context) {
    const pypiClient = pypi_1.PypiClient.default();
    const pypiService = new pypi_1.PypiService(context.globalStorageUri, pypiClient);
    const poetryService = new poetry_service_1.PoetryService(pypiService);
    const extensionService = new extension_service_1.ExtensionService(poetryService);
    context.subscriptions.push(...[
        vscode_1.commands.registerCommand("vscode-python-poetry.installPackages", 
        /* istanbul ignore next */
        () => extensionService.installPackages()),
        vscode_1.commands.registerCommand("vscode-python-poetry.installPackagesWithOptions", 
        /* istanbul ignore next */
        () => extensionService.installPackagesWithOptions()),
        vscode_1.commands.registerCommand("vscode-python-poetry.addPackage", 
        /* istanbul ignore next */
        () => extensionService.addPackage()),
        vscode_1.commands.registerCommand("vscode-python-poetry.addDevPackageLegacy", 
        /* istanbul ignore next */
        () => extensionService.addDevPackageLegacy()),
        vscode_1.commands.registerCommand("vscode-python-poetry.removePackage", 
        /* istanbul ignore next */
        () => extensionService.removePackage()),
        vscode_1.commands.registerCommand("vscode-python-poetry.removeDevPackageLegacy", 
        /* istanbul ignore next */
        () => extensionService.removeDevPackageLegacy()),
        vscode_1.commands.registerCommand("vscode-python-poetry.updatePackages", 
        /* istanbul ignore next */
        () => extensionService.updatePackages()),
        vscode_1.commands.registerCommand("vscode-python-poetry.updatePackagesWithOptions", 
        /* istanbul ignore next */
        () => extensionService.updatePackagesWithOptions()),
        vscode_1.commands.registerCommand("vscode-python-poetry.updatePackagesNoDev", 
        /* istanbul ignore next */
        () => extensionService.updatePackagesNoDev()),
        vscode_1.commands.registerCommand("vscode-python-poetry.updatePackage", 
        /* istanbul ignore next */
        () => extensionService.updatePackage()),
        vscode_1.commands.registerCommand("vscode-python-poetry.lockPackages", 
        /* istanbul ignore next */
        () => extensionService.lockPackages()),
        vscode_1.commands.registerCommand("vscode-python-poetry.lockPackagesNoUpdate", 
        /* istanbul ignore next */
        () => extensionService.lockPackagesNoUpdate()),
    ]);
}
function deactivate() {
    // This method is called when the extension is deactivated
}
//# sourceMappingURL=extension.js.map