"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("axios");
const mocha_1 = require("mocha");
const sinon_1 = require("sinon");
const pypi_client_1 = require("../../../pypi/pypi-client");
suite("PypiClient", () => {
    const axiosRes = { data: undefined };
    const packages = {
        meta: {
            "_last-serial": 16434683,
            "api-version": "1.0",
        },
        projects: [
            {
                "_last-serial": 3075854,
                name: "projectA",
            },
            {
                "_last-serial": 1448421,
                name: "projectB",
            },
        ],
    };
    let axios;
    let sut;
    (0, mocha_1.beforeEach)(() => {
        axios = (0, sinon_1.createStubInstance)(axios_1.Axios);
        sut = new pypi_client_1.PypiClient(axios);
    });
    (0, mocha_1.afterEach)(() => {
        (0, sinon_1.restore)();
    });
    test("get packages", async () => {
        (0, sinon_1.stub)(axiosRes, "data").value(packages);
        axios.get.returns(Promise.resolve(axiosRes));
        const actual = await sut.getPackages();
        sinon_1.assert.match(actual, packages);
        sinon_1.assert.calledWithMatch(axios.get, "/simple", (0, sinon_1.match)({
            headers: { accept: "application/vnd.pypi.simple.v1+json" },
        }));
    });
});
//# sourceMappingURL=pypi-client.test.js.map