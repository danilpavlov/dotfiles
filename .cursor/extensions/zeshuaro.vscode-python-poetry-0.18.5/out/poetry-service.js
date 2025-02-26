"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoetryService = void 0;
const vscode_1 = require("vscode");
const types_1 = require("./types");
class PoetryService {
    constructor(pypiService) {
        this.pypiService = pypiService;
    }
    async installPackages({ askOptions = false, } = {}) {
        const args = [types_1.PoetryCommand.install];
        if (askOptions) {
            const opts = await this.getOptions(_a.installOptions);
            if (opts) {
                const optionArgs = await this.getCommandOptions(opts);
                args.push(...optionArgs);
            }
        }
        this.runPoetry(args);
    }
    async managePackages({ command, isDev = false, askGroup = false, }) {
        let packageName;
        if (command === types_1.PoetryCommand.add) {
            packageName = await this.promptPackageNameWithSearch();
        }
        else {
            packageName = await this.promptPackageName();
        }
        if (!packageName) {
            return;
        }
        const args = [command, packageName];
        if (isDev) {
            args.push("--dev");
        }
        if (askGroup) {
            const group = await this.promptGroup();
            if (group === undefined) {
                return;
            }
            if (group.length > 0) {
                args.push(`--group ${group}`);
            }
        }
        this.runPoetry(args);
    }
    async updatePackages({ askPackageName = false, askOptions = false, noDev = false, } = {}) {
        const args = [types_1.PoetryCommand.update];
        let packageName;
        if (askPackageName) {
            packageName = await this.promptPackageName();
            if (!packageName) {
                return;
            }
            args.push(packageName);
        }
        if (askOptions) {
            const opts = await this.getOptions(_a.updateOptions);
            if (opts) {
                const optionArgs = await this.getCommandOptions(opts);
                args.push(...optionArgs);
            }
        }
        if (noDev) {
            args.push("--no-dev");
        }
        this.runPoetry(args);
    }
    lockPackages({ noUpdate = false } = {}) {
        const args = [types_1.PoetryCommand.lock];
        if (noUpdate) {
            args.push("--no-update");
        }
        this.runPoetry(args);
    }
    async getCommandOptions(options) {
        const args = [];
        for (const opt of options) {
            if (opt.promptDescription) {
                const optVal = await this.promptOptionValue(opt.promptDescription); // skipcq: JS-0032
                if (optVal !== undefined && optVal.length > 0) {
                    args.push(`${opt.value} ${optVal}`);
                }
            }
            else {
                args.push(opt.value);
            }
        }
        return args;
    }
    async getOptions(options) {
        const selectedOpts = await this.promptOptions(options.map((option) => option.description));
        if (!selectedOpts?.length) {
            return;
        }
        return selectedOpts
            .map((opt) => options.find((e) => e.description === opt))
            .filter((opt) => opt !== undefined);
    }
    getTerminal() {
        if (!this.terminal || this.terminal.exitStatus) {
            this.terminal = vscode_1.window.createTerminal();
        }
        return this.terminal;
    }
    promptGroup() {
        return vscode_1.window.showInputBox({
            title: "Enter a dependency group",
            placeHolder: "Leave it as empty to use the main dependency group",
        });
    }
    promptOptions(items) {
        return vscode_1.window.showQuickPick(items, {
            canPickMany: true,
            title: "Select one or more options to run with the command",
            placeHolder: "Press space to select/unselect an option",
        });
    }
    promptOptionValue(placeholder) {
        return vscode_1.window.showInputBox({
            title: "Enter a value for the option",
            placeHolder: placeholder,
        });
    }
    // TODO: Figure out how to mock QuickPick
    /* istanbul ignore next */
    async promptPackageNameWithSearch() {
        const quickPick = vscode_1.window.createQuickPick();
        quickPick.title = "Enter a package name, git URL or local path";
        quickPick.placeholder = "Package name, git URL or local path";
        quickPick.onDidChangeValue((userInput) => {
            const items = this.pypiService
                .searchPackages(userInput)
                ?.map((project) => {
                return {
                    label: project.name,
                };
            });
            if (items) {
                quickPick.items = items;
            }
        });
        const packageName = await new Promise((resolve) => {
            quickPick.onDidAccept(() => resolve(quickPick.value));
            quickPick.onDidHide(() => resolve(undefined));
            quickPick.show();
        });
        quickPick.dispose();
        return packageName;
    }
    promptPackageName() {
        return vscode_1.window.showInputBox({
            title: "Enter a package name, git URL or local path",
            placeHolder: "Package name, git URL or local path",
        });
    }
    runPoetry(args) {
        const terminal = this.getTerminal();
        terminal.show();
        terminal.sendText(`poetry ${args.join(" ")}`);
    }
}
exports.PoetryService = PoetryService;
_a = PoetryService;
PoetryService.groupOptions = [
    {
        description: "Run without the dependency groups (--without)",
        value: "--without",
        promptDescription: "Enter the dependency groups to ignore (--without)",
    },
    {
        description: "Only include certain dependency groups (--only)",
        value: "--only",
        promptDescription: "Enter the dependency groups to include only (--only)",
    },
];
PoetryService.installOptions = [
    ..._a.groupOptions,
    {
        description: "[DEPRECATED, use --without] Do not install the development dependencies (--no-dev)",
        value: "--no-dev",
    },
    {
        description: "Do not install the root package (the current project) (--no-root)",
        value: "--no-root",
    },
    {
        description: "[DEPRECATED, use --sync] Remove packages not present in the lock file (--remove-untracked)",
        value: "--remove-untracked",
    },
    {
        description: "Synchronize the environment with the locked packages (--sync)",
        value: "--sync",
    },
];
PoetryService.updateOptions = [..._a.groupOptions];
//# sourceMappingURL=poetry-service.js.map