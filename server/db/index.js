const mysql = require("mysql");
const fs = require("fs");

// mysql://user:password@host:port/database
let layout = /^mysql:\/\/(.+):(.+)@(.+):(\d+)\/(.+)$/.exec(process.env.JAWSDB_URL);
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
    async queryFromFile(path) {
        let file = await fs.promises.readFile(path, {encoding: "utf-8"});
        return this.query(file);
    }
    // postgres project structure have example of automatically kill connection after some time
}

// https://github.com/mysqljs/mysql#closing-all-the-connections-in-a-pool
// Call pool.end to end all the connections in the pool, or else the event loop
// will stay active until the connections are closed by the MySQL server. This
// is typically done if the pool is used in a script or when trying to
// gracefully shutdown a server.
// pool.end(function (err) {
//     if (err) throw err;
// });
