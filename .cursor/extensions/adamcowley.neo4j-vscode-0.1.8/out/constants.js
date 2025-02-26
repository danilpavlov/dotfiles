"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YES = exports.METHOD_WRITE = exports.METHOD_READ = exports.parameterTypes = exports.PARAMETER_TYPE_NULL = exports.PARAMETER_TYPE_OBJECT = exports.PARAMETER_TYPE_FLOAT = exports.PARAMETER_TYPE_INT = exports.PARAMETER_TYPE_STRING = exports.PARAMETERS = exports.CONNECTIONS = exports.schemes = exports.SCHEME_BOLT_SELF_SIGNED = exports.SCHEME_BOLT_SECURE = exports.SCHEME_BOLT = exports.SCHEME_NEO4J_SELF_SIGNED = exports.SCHEME_NEO4J_SECURE = exports.SCHEME_NEO4J = void 0;
exports.SCHEME_NEO4J = 'neo4j';
exports.SCHEME_NEO4J_SECURE = 'neo4j+s';
exports.SCHEME_NEO4J_SELF_SIGNED = 'neo4j+ssc';
exports.SCHEME_BOLT = 'bolt';
exports.SCHEME_BOLT_SECURE = 'bolt+s';
exports.SCHEME_BOLT_SELF_SIGNED = 'bolt+ssc';
exports.schemes = [
    exports.SCHEME_NEO4J,
    exports.SCHEME_NEO4J_SECURE,
    exports.SCHEME_NEO4J_SELF_SIGNED,
    exports.SCHEME_BOLT,
    exports.SCHEME_BOLT_SECURE,
    exports.SCHEME_BOLT_SELF_SIGNED,
];
exports.CONNECTIONS = 'neo4j.connections';
exports.PARAMETERS = 'neo4j.parameters';
exports.PARAMETER_TYPE_STRING = 'STRING'; // will keep value
exports.PARAMETER_TYPE_INT = 'INT'; // neo4j.int(value)
exports.PARAMETER_TYPE_FLOAT = 'FLOAT'; // parseFloat(value)
exports.PARAMETER_TYPE_OBJECT = 'JSON or OBJECT'; // JSON.parse(value)
exports.PARAMETER_TYPE_NULL = 'NULL'; // null
exports.parameterTypes = [
    exports.PARAMETER_TYPE_STRING,
    exports.PARAMETER_TYPE_INT,
    exports.PARAMETER_TYPE_FLOAT,
    exports.PARAMETER_TYPE_OBJECT,
    exports.PARAMETER_TYPE_NULL,
];
exports.METHOD_READ = 'executeRead';
exports.METHOD_WRITE = 'executeWrite';
exports.YES = 'Yes';
//# sourceMappingURL=constants.js.map