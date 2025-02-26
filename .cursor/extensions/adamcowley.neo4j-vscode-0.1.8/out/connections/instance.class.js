"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const database_class_1 = require("./database.class");
const user_class_1 = require("./user.class");
const label_class_1 = require("./label.class");
const role_class_1 = require("./role.class");
const utils_1 = require("../utils");
class Instance {
    constructor(id, name, scheme, host, port, username, password, database, active) {
        this.id = id;
        this.name = name;
        this.scheme = scheme;
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
        this.active = active;
        // this.getDriver()
        //   .then(driver => driver.verifyConnectivity())
        //   .catch(e => this.error = e)
    }
    async getTreeItem() {
        const driver = await this.getDriver();
        const session = driver.session();
        let icon = 'database';
        let edition = '';
        let database = this.database ? `/${this.database}` : '';
        if ((0, utils_1.isAuraConnection)(this.host)) {
            icon = 'database-aura';
            edition = ` (aura)`;
        }
        else if (this.error) {
            icon = 'alert';
        }
        else {
            try {
                const res = await session.executeRead(tx => tx.run('CALL dbms.components'));
                edition = ` (${res.records[0].get('edition')})`;
                const versions = res.records[0].get('versions');
                if (versions[0].includes('aura')) {
                    icon = 'database-aura';
                }
            }
            catch (e) {
                this.error = e;
            }
            await session.close();
        }
        const active = this.active ? '*' : '';
        return {
            id: this.id,
            label: `${this.name || this.id}${database}${edition}${active}`,
            collapsibleState: vscode.TreeItemCollapsibleState.None,
            contextValue: "connection",
            iconPath: (0, utils_1.iconPath)(icon),
            command: {
                title: 'Set as Active Connection',
                command: 'neo4j.setActiveConnection',
                tooltip: `Set ${this.id} as the Active Connection`,
                arguments: [this],
            }
        };
    }
    async getDriver() {
        if (!this.driver) {
            this.driver = (0, utils_1.getDriverForConnection)(this);
        }
        return this.driver;
    }
    async getChildren() {
        if (this.error) {
            return [new label_class_1.default(this.error.message, 'error', 'alert')];
        }
        return [];
        // const session = driver.session({ database: "system" });
        // const tx = session.beginTransaction();
        // return Promise.all([
        //     this.getDatabases(tx),
        //     this.getUsers(tx),
        //     this.getRoles(tx),
        // ])
        //     .then(([ databases, users, roles ]) => databases.concat(users, roles))
        //     .catch(e => {
        //         this.error = e;
        //         return [];
        //     });
    }
    getDatabases(tx) {
        return tx.run('SHOW DATABASES')
            .then(res => {
            return res.records.map(row => new database_class_1.default(row.get('name'), row.get('address'), row.get('role'), row.get('requestedStatus'), row.get('currentStatus'), row.get('error'), row.get('default')));
        })
            .catch(e => {
            this.error = e;
            return [];
        });
    }
    getUsers(tx) {
        return tx.run('SHOW USERS')
            .then(res => {
            const children = res.records.map(row => new user_class_1.default(row.get('user'), row.get('roles'), row.get('passwordChangeRequired'), row.get('suspended')));
            return new label_class_1.default('Users', 'users', 'users', children);
        });
    }
    getRoles(tx) {
        return tx.run('SHOW ALL ROLES WITH USERS')
            .then(res => {
            const reduced = res.records.map(row => ({
                role: row.get('role'),
                member: row.get('member')
            })).reduce((acc, row) => {
                if (!acc[row.role]) {
                    acc[row.role] = new role_class_1.default(row.role);
                }
                if (row.member) {
                    acc[row.role].addMember(row.member);
                }
                return acc;
            }, {});
            const children = Object.values(reduced);
            return new label_class_1.default('Roles', 'roles', 'roles', children);
        });
    }
}
exports.default = Instance;
//# sourceMappingURL=instance.class.js.map