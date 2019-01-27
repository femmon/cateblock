module.exports = {
    createAccount: (username, salt, hash) => {
        pool.query("INSERT INTO Accounts VALUES (?, ?, ?);", [username, salt, hash], (err) => {
            if (err) {
                throw err;
            }
        });
    },
    deleteAccount: (username) => {
        pool.query("DELETE FROM Accounts WHERE Username = ?;", [username], (err) => {
            if (err) {
                throw err;
            }
        });
    },
    createEntry: (username, content, postTime) => {
        pool.query("INSERT INTO Entries VALUES (0, ?, ?, ?);", [username, content, postTime], (err) => {
            if (err) {
                throw err;
            }
        });
    },
    editEntry: (username, entryID, content, postTime) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                throw err;
            }
            connection.query("SELECT COUNT(*) FROM Entries WHERE Username = ? and EntryID = ?;", [username, entryID], (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                if (results[0].count) {
                    connection.query("UPDATE History SET Generations = Generations + 1 WHERE EntryID = ?; INSERT INTO History (EntryID, Content, PostTime, Generations) SELECT EntryID, Content, PostTime, 1 FROM Entries WHERE EntryID = ?; UPDATE Entries SET Content = ?, PostTime = ? WHERE EntryID = ?;", [entryID, entryID, content, postTime, entryID], (err) => {
                        connection.release();
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
        });
    },
    removeEntry: (username, entryID) => {
        pool.query("DELETE FROM Entries WHERE Username = ? AND EntryID = ?;", [username, entryID], (err) => {
            if (err) {
                throw err;
            }
        });
    },
    viewEntry: (username, offset) => {
        pool.query("SELECT Content, PostTime FROM Entries WHERE Username = ? ORDER BY EntryID DESC LIMIT 5 OFFSET ?;", [username, offset], (err) => {
            if (err) {
                throw err;
            }
        });
    },
    viewEdit: (username, entryID) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                throw err;
            }
            connection.query("SELECT COUNT(*) FROM Entries WHERE Username = ? and EntryID = ?;", [username, entryID], (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                if (results[0].count) {
                    connection.query("SELECT Content, PostTime FROM History WHERE EntryID = ? ORDER BY Generations;", [entryID], (err, results) => {
                        connection.release();
                        if (err) {
                            throw err;
                        }
                        return results;
                    });
                }
            });
        });
    }
}
