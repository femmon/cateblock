const express = require("express");
const pool = require("../db");
const crypto = require("crypto");

const router = express.Router();

function isUsernameValid(username) {
    username = username.trim();
    // Should I remove upper limit
    let rule = /^[\w-_]{3,20}$/;
    return rule.test(username);
}

// Sign up
router.post("/", async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        if (isUsernameValid(username) && password.length > 5) {
            let connection = await pool.getConnection();
            let results = await pool.query("SELECT COUNT(*) FROM Accounts WHERE Username = ?;", [username], connection);
            if (!results[0]["COUNT(*)"]) {
                let salt = crypto.randomBytes(128).toString("base64");
                let iterations = 100000;
                crypto.pbkdf2(password, salt, iterations, 512, "sha512", async (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    hash = hash.toString("base64");
                    await pool.query("INSERT INTO Accounts VALUES (?, ?, ?, ?);", [username, salt, iterations, hash]);
                    connection.release();
                    req.session.username = username;
                    res.status(200).end();
                });
            } else {
                connection.release();
                res.status(400).send("This username is unavailable");
            }
        } else {
            res.status(400).send("Username and/or password is invalid");
        }
    } catch (err) {
        throw err;
    }
});

// log out
router.delete("/session", async (req, res) => {
    try {
        if (req.session.username) {
            req.session.destroy();
        }
        res.status(200).end();
    } catch (err) {
        throw err;
    }
});

// Is logged in?
router.get("/session", (req, res) => {
    if (req.session.username) {
        res.status(200).send({
            loggedIn: true,
            username: req.session.username
        });
    } else {
        // Implicit {loggedIn: false, username: null}
        res.status(200).send({});
    }
});

// Log in
router.post("/session", async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        if (isUsernameValid(username) && password.length > 5) {
            let results = await pool.query("SELECT Salt, Iterations, Hash FROM Accounts WHERE Username = ?;", [username]);
            if (!results[0]) {
                return res.status(400).send("Username is nonexistent");
            }
            crypto.pbkdf2(password, results[0].Salt, results[0].Iterations, 512, "sha512", (err, hash) => {
                if (err) {
                    throw err;
                }
                hash = hash.toString("base64");
                if (hash === results[0].Hash) {
                    req.session.username = username;
                    res.status(200).end();
                } else {
                    res.status(400).send("Password is wrong");
                }
            });
        } else {
            res.status(400).send("Username and/or password is invalid");
        }
    } catch (err) {
        throw err;
    }
});

router.post("/is-available", async (req, res) => {
    try {
        let username = req.body.username;
        if (isUsernameValid(username)) {
            let results = await pool.query("SELECT COUNT(*) FROM Accounts WHERE Username = ?;", [username]);
            if (!results[0]["COUNT(*)"]) {
                res.status(200).send("This username is available");
            } else {
                res.status(200).send("This username is unavailable");
            }
        } else {
            res.status(200).send("This username is invalid");
        }
    } catch (err) {
        throw err;
    }
});

// Delete account
router.delete("/", async (req, res) => {
    try {
        if (req.session.username) {
            await pool.query("DELETE FROM Accounts WHERE Username = ?;", [req.session.username]);
            req.session.destroy();
        }
        res.status(200).end();
    } catch (err) {
        throw err;
    }
});

module.exports = router;
