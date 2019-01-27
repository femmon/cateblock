const mysql = require("mysql");

// mysql://user:password@host:port/database
var layout = /^mysql:\/\/(.+):(.+)@(.+):(\d+)\/(.+)$/.exec(process.env.JAWSDB_URL);
const pool  = mysql.createPool({
    connectionLimit    : 5,
    host               : layout[3],
    user               : layout[1],
    password           : layout[2],
    database           : layout[5],
    port               : layout[4],
    multipleStatements : true
});

module.exports = {
    query: (sqlString, values, callback) => {
        return pool.query(sqlString, values, callback);
    },
    getConnection: (callback) => {
        pool.getConnection((err, connection) => {
            callback(err, connection);
        })
    }
    // postgres project structure have example of automatically kill connection after some time
}
