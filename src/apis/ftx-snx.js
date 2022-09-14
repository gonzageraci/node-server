const ccxt = require("ccxt");
const https = require("https");
const axios = require("axios");

var snxPrice = async() => {

    const exchange = new ccxt.ftx();

    const price = await exchange.fetchTicker("SNX-PERP");
    return price.last
}

async function lastFundRate() {
    var rate = await axios.get("https://ftx.com/api/funding_rates?future=SNX-PERP");
    return (rate.data.result[0].rate);
}

module.exports = {
    snxPrice,
    lastFundRate
}