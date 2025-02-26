"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const sinon_1 = require("sinon");
const extension_service_1 = require("../../extension-service");
const poetry_service_1 = require("../../poetry-service");
const types_1 = require("../../types");
suite("ExtensionService", () => {
    let poetryService;
    let sut;
    (0, mocha_1.beforeEach)(() => {
        poetryService = (0, sinon_1.createStubInstance)(poetry_service_1.PoetryService);
        sut = new extension_service_1.ExtensionService(poetryService);
    });
    (0, mocha_1.afterEach)(() => {
        (0, sinon_1.restore)();
    });
    test("install packages", async () => {
        await sut.installPackages();
        sinon_1.assert.calledOnce(poetryService.installPackages);
    });
    test("install packages with options", async () => {
        await sut.installPackagesWithOptions();
        sinon_1.assert.calledOnceWithExactly(poetryService.installPackages, {
            askOptions: true,
        });
    });
    test("add package", async () => {
        await sut.addPackage();
        sinon_1.assert.calledOnceWithExactly(poetryService.managePackages, {
            command: types_1.PoetryCommand.add,
            askGroup: true,
        });
    });
    test("add dev package", async () => {
        await sut.addDevPackageLegacy();
        sinon_1.assert.calledOnceWithExactly(poetryService.managePackages, {
            command: types_1.PoetryCommand.add,
            isDev: true,
        });
    });
    test("remove package", async () => {
        await sut.removePackage();
        sinon_1.assert.calledOnceWithExactly(poetryService.managePackages, {
            command: types_1.PoetryCommand.remove,
            askGroup: true,
        });
    });
    test("remove dev package", async () => {
        await sut.removeDevPackageLegacy();
        sinon_1.assert.calledOnceWithExactly(poetryService.managePackages, {
            command: types_1.PoetryCommand.remove,
            isDev: true,
        });
    });
    test("update packages", async () => {
        await sut.updatePackages();
        sinon_1.assert.calledOnce(poetryService.updatePackages);
    });
    test("update packages with options", async () => {
        await sut.updatePackagesWithOptions();
        sinon_1.assert.calledOnceWithExactly(poetryService.updatePackages, {
            askOptions: true,
        });
    });
    test("update packages no dev", async () => {
        await sut.updatePackagesNoDev();
        sinon_1.assert.calledOnceWithExactly(poetryService.updatePackages, {
            noDev: true,
        });
    });
    test("update package", async () => {
        await sut.updatePackage();
        sinon_1.assert.calledOnceWithExactly(poetryService.updatePackages, {
            askPackageName: true,
        });
    });
    test("lock packages", () => {
        sut.lockPackages();
        sinon_1.assert.calledOnce(poetryService.lockPackages);
    });
    test("lock packages no update", () => {
        sut.lockPackagesNoUpdate();
        sinon_1.assert.calledOnceWithExactly(poetryService.lockPackages, {
            noUpdate: true,
        });
    });
});
//# sourceMappingURL=extension-service.test.js.map