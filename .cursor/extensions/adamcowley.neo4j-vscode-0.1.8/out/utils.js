"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCredentialsFromActiveEditor = exports.isAuraConnection = exports.iconPath = exports.querySummary = exports.getDriverForConnection = exports.toNativeTypes = exports.extractCredentials = void 0;
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const vscode_1 = require("vscode");
const path_1 = require("path");
const neo4j_driver_1 = require("neo4j-driver");
const constants_1 = require("./constants");
function extractCredentials(input) {
    // Append protocol if none exists
    if (!input.includes('://')) {
        input = 'neo4j://' + input;
    }
    // Parse URL
    const url = new URL(input);
    const { protocol, username, password, hostname, port, searchParams } = url;
    const database = searchParams.get('database');
    return {
        scheme: (protocol.replace(':', '') || constants_1.SCHEME_NEO4J),
        host: hostname,
        port: port || '7687',
        username,
        password,
        database,
        active: false,
    };
}
exports.extractCredentials = extractCredentials;
// TODO: Get tests working
// console.log(extractCredentials("neo4j+s://dbhash.databases.neo4j.io")) // {"scheme":"neo4j+s","host":"dbhash.databases.neo4j.io"}
// console.log(extractCredentials("bolt+s://dbhash.databases.neo4j.io")) // {"scheme":"bolt+s","host":"dbhash.databases.neo4j.io"}
// console.log(extractCredentials("dbhash.databases.neo4j.io")) // {"scheme":"neo4j","host":"dbhash.databases.neo4j.io"}
// console.log(extractCredentials("dbhash.databases.neo4j.io:1234")) // {"scheme":"neo4j","host":"dbhash.databases.neo4j.io","port":"1234"}
// console.log(extractCredentials("dbhash.databases.neo4j.io:1234?database=foo")) // {"scheme":"neo4j","host":"dbhash.databases.neo4j.io","port":"1234","database":"foo"}
// console.log(extractCredentials("neo4j+s://user:pass@dbhash.databases.neo4j.io:1234?database=foo")) // {"scheme":"neo4j+s","host":"dbhash.databases.neo4j.io","port":"1234","username":"user","password":"pass","database":"foo"}
// console.log(extractCredentials("wt")) // {"scheme":"neo4j","host":"wt"}
// console.log(extractCredentials("1234")) // {"scheme":"neo4j","host":"1234"}
// console.log(extractCredentials("127.0.0.1:1234")) // {"scheme":"neo4j","host":"127.0.0.1","port":"1234"}
/**
 * Convert Neo4j Properties back into JavaScript types
 *
 * @param {Record<string, any>} properties
 * @return {Record<string, any>}
 */
function toNativeTypes(properties) {
    return Object.fromEntries(Object.keys(properties).map((key) => {
        let value = valueToNativeType(properties[key]);
        return [key, value];
    }));
}
exports.toNativeTypes = toNativeTypes;
/**
 * Convert an individual value to its JavaScript equivalent
 *
 * @param {any} value
 * @returns {any}
 */
function valueToNativeType(value) {
    if (Array.isArray(value)) {
        value = value.map(innerValue => valueToNativeType(innerValue));
    }
    else if ((0, neo4j_driver_1.isInt)(value)) {
        value = value.toNumber();
    }
    else if ((0, neo4j_driver_1.isDate)(value) ||
        (0, neo4j_driver_1.isDateTime)(value) ||
        (0, neo4j_driver_1.isTime)(value) ||
        (0, neo4j_driver_1.isLocalDateTime)(value) ||
        (0, neo4j_driver_1.isLocalTime)(value) ||
        (0, neo4j_driver_1.isDuration)(value)) {
        value = value.toString();
    }
    else if (typeof value === 'object' && value !== undefined && value !== null) {
        value = toNativeTypes(value);
    }
    return value;
}
function getDriverForConnection(activeConnection) {
    return neo4j_driver_1.default.driver(`${activeConnection.scheme}://${activeConnection.host}:${activeConnection.port}`, neo4j_driver_1.default.auth.basic(activeConnection.username, activeConnection.password));
}
exports.getDriverForConnection = getDriverForConnection;
function querySummary(result) {
    const rows = result.records.length;
    const counters = result.summary.counters;
    const output = [];
    // Streamed
    if (rows > 0) {
        // Started streaming 1 records after 5 ms and completed after 10  ms.
        output.push(`Started streaming ${rows} record${rows === 1 ? '' : 's'} after ${result.summary.resultConsumedAfter}ms and completed after ${result.summary.resultAvailableAfter}ms.`);
    }
    if (counters.containsUpdates()) {
        const updates = [];
        const updateCounts = counters.updates();
        for (const key in updateCounts) {
            const count = updateCounts[key];
            if (count > 0) {
                const parts = key.split(/(?=[A-Z])/);
                updates.push(`${count} ${parts.map(value => value.toLowerCase()).join(' ')}`);
            }
        }
        if (updates.length > 0) {
            output.push(`${updates.join(', ')}.`);
        }
    }
    if (counters.containsSystemUpdates()) {
        output.push(`${counters.systemUpdates()} system updates.`);
    }
    return output;
}
exports.querySummary = querySummary;
function iconPath(filename) {
    return {
        light: (0, path_1.join)(__filename, '..', '..', 'images', 'icons', `${filename}-light.svg`),
        dark: (0, path_1.join)(__filename, '..', '..', 'images', 'icons', `${filename}-dark.svg`),
    };
}
exports.iconPath = iconPath;
function isAuraConnection(host) {
    return host.endsWith('.neo4j.io');
}
exports.isAuraConnection = isAuraConnection;
async function extractCredentialsFromActiveEditor() {
    // Check current file for .env
    let envScheme, envHost, envPort, envUsername, envPassword, envDatabase;
    if (vscode_1.window.activeTextEditor) {
        const text = vscode_1.window.activeTextEditor.document.getText();
        if (text?.includes('NEO4J_URI')) {
            const matchUri = text.match(/NEO4J_URI=(.*)/);
            const matchUsername = text.match(/NEO4J_USERNAME=(.*)/);
            const matchPassword = text.match(/NEO4J_PASSWORD=(.*)/);
            if (matchUri) {
                try {
                    const res = extractCredentials(matchUri[1]);
                    envScheme = res?.scheme;
                    envHost = res?.host;
                    envPort = res?.port;
                    envDatabase = res?.database;
                }
                catch (e) { }
            }
            if (matchUsername) {
                envUsername = matchUsername[1].trim();
            }
            if (matchPassword) {
                envPassword = matchPassword[1].trim();
            }
            return {
                scheme: envScheme,
                host: envHost,
                port: envPort,
                username: envUsername,
                password: envPassword,
                database: envDatabase,
            };
        }
    }
    return {};
}
exports.extractCredentialsFromActiveEditor = extractCredentialsFromActiveEditor;
//# sourceMappingURL=utils.js.map