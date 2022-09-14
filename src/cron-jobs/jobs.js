import { snxPrice, lastFundRate } from "../apis/ftx-snx";
import { ftxPAXG, ftxSNX, getCoinrate, getPrice } from "../apis/ftx";
import { db, insertRawUSDT, insertRawUSD, insertRawSNX, insertRawAAVE, insertRawETH } from "../database";

var cron = require("node-cron");
/*
const trytask = cron.schedule("0 * * * *", () => {
    snxPrice().then(_price => {
        lastFundRate().then(async _rate => {
            const funding = Funding({ symbol: "SNX-PERP", price: _price, rate: _rate })
            const fundingSaved = await funding.save()
            console.log(fundingSaved)
        })
    })
})
*/
//const price;

const saveRates = cron.schedule("0 * * * *", async() => {
    try {

        /*var usdt = await getCoinrate(ftxPAXG, "USDT").then(async(data) => {
                var price = await getPrice(ftxPAXG, "USDT").then(data => {
                    return data
                })
                return [data[1], data[2], data[3], price, data[4]];
            })*/
        /*
                var usd = await getCoinrate(ftxPAXG, "USD").then(form => {
                    return [form[1], form[2], form[3]];
                })
        */
        var snx = await getCoinrate(ftxPAXG, "SNX").then(async(data) => {
            var price = await getPrice(ftxPAXG, "SNX").then(data => {
                return data
            })
            return [data[1], data[2], data[3], price, data[4]];
        })

        var aave = await getCoinrate(ftxPAXG, "AAVE").then(async(data) => {
            var price = await getPrice(ftxPAXG, "AAVE").then(data => {
                return data
            })
            return [data[1], data[2], data[3], price, data[4]];
        })

        var eth = await getCoinrate(ftxPAXG, "ETH").then(async(data) => {
            var price = await getPrice(ftxPAXG, "ETH").then(data => {
                return data
            })
            return [data[1], data[2], data[3], price, data[4]];
        })

        db.serialize(() => {
                //insertRawUSDT(usdt[0], usdt[1], usdt[2], usdt[3], usdt[4]);
                //console.log("USDT inserted");
                //insertRawUSD(usd[0], usd[1], usd[2]);
                //console.log("USD inserted");
                insertRawSNX(snx[0], snx[1], snx[2], snx[3], snx[4]);
                //console.log("SNX inserted");
                insertRawAAVE(aave[0], aave[1], aave[2], aave[3], aave[4]);
                //console.log("AAVE inserted");
                insertRawETH(eth[0], eth[1], eth[2], eth[3], eth[4]);
            })
            //db.close();
            //console.log("inserted data on DB " + usdt[1])

    } catch (error) { console.log(error); }
})

module.exports = {
    saveRates
}