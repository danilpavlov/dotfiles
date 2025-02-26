"use strict";
// Create a Common DB Connection library both
// the language server and the client can use
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgClient = void 0;
const pg_1 = require("pg");
const postgres_array_1 = require("postgres-array");
function parseStringArray(value) {
    if (!value) {
        return null;
    }
    return postgres_array_1.parse(value, v => String(v));
}
pg_1.types.setTypeParser(pg_1.types.builtins.DATE, v => String(v));
pg_1.types.setTypeParser(pg_1.types.builtins.TIME, v => String(v));
pg_1.types.setTypeParser(pg_1.types.builtins.TIMESTAMP, v => String(v));
pg_1.types.setTypeParser(pg_1.types.builtins.TIMESTAMPTZ, v => String(v));
// @ts-ignore timestamp[]
pg_1.types.setTypeParser(1115, parseStringArray);
// @ts-ignore _date (probably date[])
pg_1.types.setTypeParser(1182, parseStringArray);
// @ts-ignore timestamptz[]
pg_1.types.setTypeParser(1185, parseStringArray);
class PgClient extends pg_1.Client {
    constructor(config) {
        super(config);
        this.is_ended = false;
        this.on('end', () => {
            this.is_ended = true;
        });
    }
}
exports.PgClient = PgClient;
//# sourceMappingURL=connection.js.map