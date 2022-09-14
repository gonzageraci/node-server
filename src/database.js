const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('fundrates.db');

// funcion para insertar data en una tabla

async function insertRaw(table, date, hour, rate, price, size) {
    const stmt = db.prepare(`INSERT INTO ${table} (?, ?, ?, ?, ?)`);
    stmt.run(date, hour, rate, price, size);
    stmt.finalize();
}

// funciones para insertar data en cada tabla

async function insertRawSNX(date, hour, rate, price, size) {
    const stmt = db.prepare("INSERT INTO SNX VALUES (?, ?, ?, ?, ?)");
    stmt.run(date, hour, rate, price, size);
    stmt.finalize();
}

async function insertRawAAVE(date, hour, rate, price, size) {
    const stmt = db.prepare("INSERT INTO AAVE VALUES (?, ?, ?, ?, ?)");
    stmt.run(date, hour, rate, price, size);
    stmt.finalize();
}

async function insertRawUSDT(date, hour, rate, price, size) {
    const stmt = db.prepare("INSERT INTO USDT VALUES (?, ?, ?, ?, ?)");
    stmt.run(date, hour, rate, price, size);
    stmt.finalize();
}

async function insertRawCAKE(date, hour, rate, price, size) {
    const stmt = db.prepare("INSERT INTO CAKE VALUES (?, ?, ?, ?, ?)");
    stmt.run(date, hour, rate, price, size);
    stmt.finalize();
}

async function insertRawUSD(date, hour, rate, size) {
    const stmt = db.prepare("INSERT INTO USD VALUES (?, ?, ?, ?, ?)");
    stmt.run(date, hour, rate, size);
    stmt.finalize();
}

async function insertRawETH(date, hour, rate, price, size) {
    const stmt = db.prepare("INSERT INTO ETH VALUES (?, ?, ?, ?, ?)");
    stmt.run(date, hour, rate, price, size);
    stmt.finalize();
}

// lectura de tablas

function readTable(table){
    var data=[];
    return new Promise(resolve=>{
        db.all(`SELECT * from ${table}`,[],(err,rows)=>{
            if(err){
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                data.push(row);
            });

            resolve(data);
        });
    });
}


// ejemplo de uso

async function start() {
    db.serialize(() => {
        insertRawSNX("13/11/2022", "12:00", -0.002, 4);
        insertRawAAVE("13/11/2022", "12:00", -0.002, 4);
        insertRawUSDT("13/11/2022", "12:00", -0.002, 4);
        insertRawCAKE("13/11/2022", "12:00", -0.002, 4);
    });
    db.close();

}

// no te olvides de exportar las funciones nuevas

module.exports = {
    db,
    insertRaw,
    insertRawSNX,
    insertRawAAVE,
    insertRawUSDT,
    insertRawCAKE,
    insertRawUSD,
    insertRawETH,
    readTable
}