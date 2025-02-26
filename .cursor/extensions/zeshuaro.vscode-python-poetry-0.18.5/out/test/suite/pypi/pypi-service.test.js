"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const mocha_1 = require("mocha");
const sinon_1 = require("sinon");
const vscode_1 = require("vscode");
const pypi_1 = require("../../../pypi");
suite("PypiService", () => {
    const packagesCacheName = "packages-cache.json";
    const textEncoder = new TextEncoder();
    const project = { "_last-serial": 123, name: "packageA" };
    const packages = {
        meta: {
            "_last-serial": 123,
            "api-version": "v1",
        },
        projects: [project],
    };
    const packagesBytes = textEncoder.encode(JSON.stringify(packages));
    let packagesCacheUri;
    let fs;
    let readFile;
    let writeFile;
    let joinPath;
    let pypiClient;
    let globalStoragePath;
    (0, mocha_1.beforeEach)(() => {
        packagesCacheUri = (0, sinon_1.createStubInstance)(vscode_1.Uri);
        fs = {
            readFile: (_uri) => { },
            writeFile: (_uri, _content) => { },
        };
        readFile = (0, sinon_1.stub)(fs, "readFile").returns(Promise.resolve(packagesBytes));
        writeFile = (0, sinon_1.stub)(fs, "writeFile");
        (0, sinon_1.stub)(vscode_1.workspace, "fs").value(fs);
        joinPath = (0, sinon_1.stub)(vscode_1.Uri, "joinPath").returns(packagesCacheUri);
        pypiClient = (0, sinon_1.createStubInstance)(pypi_1.PypiClient, {
            getPackages: Promise.resolve(packages),
        });
        globalStoragePath = (0, sinon_1.createStubInstance)(vscode_1.Uri);
    });
    (0, mocha_1.afterEach)(() => {
        (0, sinon_1.restore)();
    });
    test("initialize", async () => {
        // eslint-disable-next-line no-new
        new pypi_1.PypiService(globalStoragePath, pypiClient);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assertInitializeSucceed();
    });
    test("initialize get cache error", async () => {
        readFile.throws();
        // eslint-disable-next-line no-new
        new pypi_1.PypiService(globalStoragePath, pypiClient);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assertInitializeSucceed();
    });
    test("initialize get packages error", async () => {
        pypiClient.getPackages.throws();
        // eslint-disable-next-line no-new
        new pypi_1.PypiService(globalStoragePath, pypiClient);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assertInitializeSucceed({ assertWriteCache: false });
    });
    test("search packages", async () => {
        const sut = new pypi_1.PypiService(globalStoragePath, pypiClient);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const actual = sut.searchPackages(project.name);
        sinon_1.assert.match(actual, [project]);
    });
    test("search packages without cache", async () => {
        const sut = new pypi_1.PypiService(globalStoragePath, pypiClient);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        sut.clearProjectsFuse();
        const actual = sut.searchPackages(project.name);
        sinon_1.assert.match(actual, undefined);
    });
    function assertInitializeSucceed({ assertWriteCache = true } = {}) {
        // Assert get cached packages
        sinon_1.assert.calledOnceWithExactly(readFile, packagesCacheUri);
        // Assert client get packages
        sinon_1.assert.calledOnce(pypiClient.getPackages);
        // Assert cache packages
        if (assertWriteCache) {
            sinon_1.assert.calledOnceWithExactly(writeFile, packagesCacheUri, packagesBytes);
        }
        // Join path should be called twice if we wrote into cache, reading and writing the cache
        joinPath
            .getCall(0)
            .calledWithExactly(joinPath, globalStoragePath, packagesCacheName);
        if (assertWriteCache) {
            joinPath
                .getCall(1)
                .calledWithExactly(joinPath, globalStoragePath, packagesCacheName);
        }
    }
}).timeout(5000);
//# sourceMappingURL=pypi-service.test.js.map