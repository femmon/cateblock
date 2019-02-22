const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/create-entry", async (req, res) => {
    try {
        if (req.session.username) {
            let content = req.body.content;
            let results = await pool.query("INSERT INTO Entries VALUES (0, ?, ?, DEFAULT, DEFAULT);", [req.session.username, content]);
            res.status(200).send(results.insertId.toString());
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

router.post("/view-entries", async (req, res) => {
    try {
        if (req.session.username) {
            let offset = req.body.offset || 0;
            let results = await pool.query("SELECT EntryID, Content, PostTime, Edited FROM Entries WHERE Username = ? ORDER BY EntryID DESC LIMIT 5 OFFSET ?;", [req.session.username, offset]);
            res.status(200).send(results);
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

router.post("/delete-entry", async (req, res) => {
    try {
        if (req.session.username) {
            let entryID = req.body.entryID;
            await pool.query("DELETE FROM Entries WHERE Username = ? AND EntryID = ?;", [req.session.username, entryID]);
            res.status(200).end();
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

router.post("/edit-entry", async (req, res) => {
    try {
        if (req.session.username) {
            let entryID = req.body.entryID;
            let content = req.body.content;
            let connection = await pool.getConnection();
            let results = await pool.query("SELECT COUNT(*) FROM Entries WHERE Username = ? and EntryID = ?;", [req.session.username, entryID], connection);
            if (results[0]["COUNT(*)"]) {
                await pool.query(`
                    UPDATE History SET Generations = Generations + 1 WHERE EntryID = ?;
                    INSERT INTO History (EntryID, Content, PostTime, Generations) SELECT EntryID, Content, PostTime, 1 FROM Entries WHERE EntryID = ?;
                    UPDATE Entries SET Content = ?, Edited = 1 WHERE EntryID = ?;`, [entryID, entryID, content, entryID], connection);
                connection.release();
                res.status(200).end();
            } else {
                connection.release();
                res.status(400).send("Invalid entry ID");
            }
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

router.post("/view-edit", async (req, res) => {
    try {
        if (req.session.username) {
            let entryID = req.body.entryID;
            let connection = await pool.getConnection();
            let results = await pool.query("SELECT COUNT(*) FROM Entries WHERE Username = ? and EntryID = ?;", [req.session.username, entryID], connection);
            if (results[0]["COUNT(*)"]) {
                let results = await pool.query("SELECT Content, PostTime FROM History WHERE EntryID = ? ORDER BY Generations;", [entryID], connection);
                connection.release();
                res.status(200).send(results);
            } else {
                connection.release();
                res.status(400).send("Invalid entry ID");
            }
        } else {
            res.status(400).end("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

module.exports = router;
