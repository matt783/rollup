const axios = require("axios");

const TICKER_PARAMS = {
    BID: 0, 
    BID_SIZE: 1, 
    ASK: 2, 
    ASK_SIZE: 3, 
    DAILY_CHANGE: 4, 
    DAILY_CHANGE_RELATIVE: 5, 
    LAST_PRICE: 6, 
    VOLUME: 7, 
    HIGH: 8, 
    LOW: 9,
};

class ApiBitfinex {

    constructor(url="https://api-pub.bitfinex.com/v2/") {
        this.url = url;
    }

    // Get last price for a given market 'currency vs base'
    async getTokenLastPrice(currency, base) {
        const pathParams = `ticker/t${currency}${base}`;
        const res = await axios.get(`${this.url}/${pathParams}`);
        return res.data[TICKER_PARAMS.LAST_PRICE];
    }

    // Gets list of valid exchange trading pairs
    async getTraddingPairs() {
        const res = await axios.get(`${this.url}/conf/pub:list:pair:exchange`);
        return res.data[0];
    }
}

module.exports = ApiBitfinex;
