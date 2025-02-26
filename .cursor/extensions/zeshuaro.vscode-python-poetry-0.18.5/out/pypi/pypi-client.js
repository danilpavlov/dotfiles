"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PypiClient = void 0;
const axios_1 = require("axios");
class PypiClient {
    /* istanbul ignore next */
    static default() {
        return new this(new axios_1.Axios({ baseURL: PypiClient.baseUrl }));
    }
    constructor(axios) {
        this.axios = axios;
    }
    async getPackages() {
        const res = await this.axios.get("/simple", {
            headers: { accept: "application/vnd.pypi.simple.v1+json" },
            // Axios doesn't transform the data automatically
            transformResponse: (data) => {
                /* istanbul ignore next */
                return JSON.parse(data);
            },
        });
        return res.data;
    }
}
exports.PypiClient = PypiClient;
PypiClient.baseUrl = "https://pypi.org";
//# sourceMappingURL=pypi-client.js.map