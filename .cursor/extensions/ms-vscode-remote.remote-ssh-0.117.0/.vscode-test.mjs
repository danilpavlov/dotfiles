//@ts-check

import { defineConfig } from '@vscode/test-cli';

export default defineConfig([
	{
		label: 'unit',
		version: 'insiders-unreleased',
		files: './out/unitTests.test.js',
		launchArgs: ['--profile-temp'],
		workspaceFolder: 'src/test-fixtures',
		installExtensions: ['ms-vscode.remote-explorer'],
		mocha: {
			// grep: ''
		}
	},
	{
		label: 'baseline',
		version: 'insiders',
		files: './out/baselineTests.test.js',
		launchArgs: ['--profile-temp'],
		workspaceFolder: 'src/test-fixtures',
		installExtensions: ['ms-vscode.remote-explorer'],
	},
]);
