"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionService = void 0;
const types_1 = require("./types");
class ExtensionService {
    constructor(poetryService) {
        this.poetryService = poetryService;
    }
    installPackages() {
        return this.poetryService.installPackages();
    }
    installPackagesWithOptions() {
        return this.poetryService.installPackages({ askOptions: true });
    }
    addPackage() {
        return this.poetryService.managePackages({
            command: types_1.PoetryCommand.add,
            askGroup: true,
        });
    }
    addDevPackageLegacy() {
        return this.poetryService.managePackages({
            command: types_1.PoetryCommand.add,
            isDev: true,
        });
    }
    removePackage() {
        return this.poetryService.managePackages({
            command: types_1.PoetryCommand.remove,
            askGroup: true,
        });
    }
    removeDevPackageLegacy() {
        return this.poetryService.managePackages({
            command: types_1.PoetryCommand.remove,
            isDev: true,
        });
    }
    updatePackages() {
        return this.poetryService.updatePackages();
    }
    updatePackagesWithOptions() {
        return this.poetryService.updatePackages({ askOptions: true });
    }
    updatePackagesNoDev() {
        return this.poetryService.updatePackages({ noDev: true });
    }
    updatePackage() {
        return this.poetryService.updatePackages({ askPackageName: true });
    }
    lockPackages() {
        return this.poetryService.lockPackages();
    }
    lockPackagesNoUpdate() {
        return this.poetryService.lockPackages({ noUpdate: true });
    }
}
exports.ExtensionService = ExtensionService;
//# sourceMappingURL=extension-service.js.map