"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PypiService = void 0;
const fuse_js_1 = __importDefault(require("fuse.js"));
const vscode_1 = require("vscode");
class PypiService {
    constructor(globalStoragePath, pypiClient) {
        this.globalStoragePath = globalStoragePath;
        this.pypiClient = pypiClient;
        this.loadAndGetPackages();
    }
    searchPackages(query) {
        if (this.projectsFuse) {
            return this.projectsFuse
                .search(query, { limit: 10 })
                .map((result) => result.item);
        }
        return undefined;
    }
    clearProjectsFuse() {
        this.projectsFuse = undefined;
    }
    get packagesCacheUri() {
        return vscode_1.Uri.joinPath(this.globalStoragePath, PypiService.packagesCacheName);
    }
    async loadAndGetPackages() {
        const packages = await this.getCachedPackages();
        if (packages) {
            this.projectsFuse = this.getProjectsFuse(packages);
        }
        await this.getAndCachePackages();
    }
    async getCachedPackages() {
        try {
            const bytes = await vscode_1.workspace.fs.readFile(this.packagesCacheUri);
            const packagesStr = new TextDecoder().decode(bytes);
            return JSON.parse(packagesStr);
        }
        catch (e) {
            console.error("Failed to get cached packages", e);
        }
        return undefined;
    }
    getProjectsFuse(packages) {
        return new fuse_js_1.default(packages.projects, {
            minMatchCharLength: 2,
            keys: ["name"],
        });
    }
    async getAndCachePackages() {
        try {
            const packages = await this.pypiClient.getPackages();
            await this.cachePackages(packages);
            this.projectsFuse = this.getProjectsFuse(packages);
        }
        catch (e) {
            console.error("Failed to get packages", e);
        }
    }
    cachePackages(packages) {
        const packagesStr = JSON.stringify(packages);
        const bytes = new TextEncoder().encode(packagesStr);
        return vscode_1.workspace.fs.writeFile(this.packagesCacheUri, bytes);
    }
}
exports.PypiService = PypiService;
PypiService.packagesCacheName = "packages-cache.json";
//# sourceMappingURL=pypi-service.js.map