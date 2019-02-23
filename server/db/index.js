const mysql = require("mysql");

// mysql://user:password@host:port/database
var layout = /^mysql:\/\/(.+):(.+)@(.+):(\d+)\/(.+)$/.exec(process.env.JAWSDB_URL);
const pool  = mysql.createPool({
    connectionLimit    : 5,
    database           : layout[5],
    host               : layout[3],
    multipleStatements : true,
    password           : layout[2],
    port               : layout[4],
    timezone           : "+00:00",
    user               : layout[1]
});

module.exports = {
    query: (sqlString, values, connection = pool) => {
        return new Promise((resolve, reject) => {
            connection.query(sqlString, values, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        })
    },
    getConnection: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                resolve(connection);
            });
        });
    },
    // postgres project structure have example of automatically kill connection after some time
}
