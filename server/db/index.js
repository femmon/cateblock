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
    dateStrings        : true,
    // time is saved in db in UTC. when it goes through mysql module, it is converted into js date object (which it also change to node timezone i think). set dateStrings make time show correctly local too.
    multipleStatements : true
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
