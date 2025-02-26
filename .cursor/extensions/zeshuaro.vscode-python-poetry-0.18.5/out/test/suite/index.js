"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const glob_1 = require("glob");
const mocha_1 = __importDefault(require("mocha"));
const path_1 = require("path");
function setupCoverage() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const NYC = require("nyc");
    const nyc = new NYC({
        cwd: (0, path_1.join)(__dirname, "..", "..", ".."),
        exclude: ["vscode-service.ts", "**/test/**", ".vscode-test/**"],
        reporter: ["text", "html", "lcov"],
        all: true,
        instrument: true,
        hookRequire: true,
        hookRunInContext: true,
        hookRunInThisContext: true,
    });
    nyc.reset();
    nyc.wrap();
    return nyc;
}
async function run() {
    // Create the mocha test
    const mocha = new mocha_1.default({
        ui: "tdd",
        color: true,
    });
    const testsRoot = (0, path_1.resolve)(__dirname, "..");
    const nyc = setupCoverage();
    const files = (0, glob_1.sync)("**/**.test.js", { cwd: testsRoot });
    files.forEach((f) => mocha.addFile((0, path_1.resolve)(testsRoot, f)));
    try {
        await new Promise((resolve, reject) => {
            mocha.run((failures) => {
                return failures
                    ? reject(new Error(`${failures} tests failed`))
                    : resolve();
            });
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    finally {
        nyc.writeCoverageFile();
        await nyc.report();
    }
}
//# sourceMappingURL=index.js.map