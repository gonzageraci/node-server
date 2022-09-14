const FTXRest = require('ftx-api-rest');

// users

const ftxSNX = new FTXRest({
    key: 'v9QSd-nbn3WmI1bdNpc18jwQFM4Tg__JB4-9kqXW',
    secret: 'OXcariY8yDLbZd0vcx_VW5u6hGkPZXUdtLbqaBSe',
    subaccount: 'SNX'
})

const ftxPAXG = new FTXRest({
    key: '6sOR-1zfl4XZpnYZLURJ_EqTFYzZF6e8M0N7GUed',
    secret: 'XleOY4avDL6EF4F35IMfEfuKW3WAAJ6ejKBXgPEW',
    subaccount: 'PAXG'
})

// 

function getCoinrate(user, token) {
    var fund;
    try {
        var array = user.request({
            method: 'GET',
            path: '/spot_margin/borrow_history'
        }).then((data) => {
            var fund = {};
            //console.log(data);
            for (var i = 0; i < data.result.length; i++) {
                if (data.result[i].coin == token) {
                    fund = data.result[i];
                    break
                } else { continue }
            }
            try {
                var date = fund.time.split("T")[0];
                var time = fund.time.split("T")[1].split("+")[0];
                return [fund.coin, date, time, fund.rate, fund.size];
            } catch (e) {
                console.log(e);
                return [null, null, null, null, null];
            }

        });
    } catch (e) {
        console.log(e);
        return [null, null, null, null];
    }

    return array
}

function getPrice(user, token) { // siempre tiene que ser un -PERP o /USD
    var price = user.request({
        method: 'GET',
        path: '/markets/' + token + "/USD"
    }).then(data => {
        return data.result.last
    })
    return price
}

// pruebas

function getCoinrate2(user, token) {

    var array = user.request({
        method: 'GET',
        path: '/spot_margin/borrow_history'
    }).then((data) => {
        //console.log(data)
        var fund = data.result[0]
        if (fund.name == token + "-PERP") {
            var date = fund.time.split("T")[0];
            var time = fund.time.split("T")[1].split("+")[0];
            return [fund.name, date, time, fund.rate];

        }

    });

    return array
}

//getCoinrate2(ftxPAXG, "USD").then(console.log)

// example of use
//getCoinrate(ftxPAXG, "USDT").then(console.log);

//getPrice(ftxPAXG, "USDT-PERP").then(data => { console.log(data) })

module.exports = {
    ftxPAXG,
    ftxSNX,
    getCoinrate,
    getPrice
}