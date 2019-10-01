const axios = require("axios");

class CliOperator {

    constructor(url) {
        this.url = url;
    }

    register(stake) {
        return axios.post(`${this.url}/register/${stake}`);
    }

    unregister(opId) {
        return axios.post(`${this.url}/unregister/${opId}`);
    }

    withdraw(opId) {
        return axios.post(`${this.url}/withdraw/${opId}`);
    }
}

module.exports = CliOperator;
