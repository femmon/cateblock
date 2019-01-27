const express = require("express");
const pool = require("./db");
const crypto = require("crypto");

const router = express.Router();

function isUsernameValid(username) {
    username = username.trim();
    // Should I remove upper limit
    let rule = /^[\w-_]{3,20}$/;
    return rule.test(username);
}

router.post("/is-available", (req, res) => {
    let username = req.body.username;
    if (isUsernameValid(username)) {
        pool.query("SELECT COUNT(*) FROM Accounts WHERE Username = ?;", [username], (err, results) => {
            if (err) {
                throw err;
            }
            if (!results[0]["COUNT(*)"]) {
                res.send("Available");
            } else {
                res.send("Unavailable");
            }
        })
    } else {
        res.send("Invalid username");
    }
});

router.post("/signup", (req, res) => {
    let username = req.body.username;
    if (isUsernameValid(username)) {
        pool.query("SELECT COUNT(*) FROM Accounts WHERE Username = ?;", [username], (err, results) => {
            if (err) {
                throw err;
            }
            if (!results[0]["COUNT(*)"]) {
                let password = req.body.password;
                if (password.length < 6) {
                    res.send("Password is too short")
                } else {
                    let salt = crypto.randomBytes(128).toString('base64');
                    let iterations = 100000;
                    crypto.pbkdf2(password, salt, iterations, 512, 'sha512', (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        hash = hash.toString("base64")
                        pool.query("INSERT INTO Accounts VALUES (?, ?, ?, ?);", [username, salt, iterations, hash], (err) => {
                            if (err) {
                                throw err;
                            }
                            req.session.username = username;
                            res.send("Success");
                        });
                    });
                }
            } else {
                res.send("Username unavailable")
            }
        })
    } else {
        res.send("Invalid username")
    }
});

router.post("/delete-account", (req, res) => {
    if (req.session.username) {
        pool.query("DELETE FROM Accounts WHERE Username = ?;", [req.session.username], (err) => {
            if (err) {
                throw err;
            }
            req.session.destroy(() => {res.send("Account is gone");});
        });
    } else {
        res.send("Account is gone");
    }
});

router.post("/login", (req, res) => {
    let username = req.body.username;
    if (isUsernameValid(username)) {
        if (username != req.session.username) {
            let password = req.body.password;
            if (password.length < 6) {
                res.send("Password is too short")
            } else {
                pool.query("SELECT Salt, Iterations, Hash FROM Accounts WHERE Username = ?;", [username], (err, results) => {
                    if (err) {
                        throw err;
                    }
                    crypto.pbkdf2(password, results[0].Salt, results[0].Iterations, 512, 'sha512', (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        hash = hash.toString("base64");
                        if (hash == results[0].Hash) {
                            req.session.username = username;
                            res.send("Success");
                        } else {
                            res.send("Wrong password");
                        }
                    });
                })
            }
        } else {
            res.send("Success")
        }
    } else {
        res.send("Invalid username")
    }
});

router.post("/signout", (req, res) => {
    if (req.session.username) {
        req.session.destroy(() => {
            res.send("log outed");
        });
    } else {
        res.send("log outed");
    }
})

router.post("/in-or-out"), (req, res) => {
    if (req.session.username) {
        res.send("In");
    }
    res.send("Out");
}

module.exports = router;
