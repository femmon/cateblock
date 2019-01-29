const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/create-entry", async (req, res) => {
    try {
        if (req.session.username) {
            let content = req.body.content;
            await pool.query("INSERT INTO Entries VALUES (0, ?, ?, DEFAULT);", [req.session.username, content]);
            res.status(200).end();
        } else {
            res.status(400).end("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

router.post("/view-entries", async (req, res) => {
    try {
        if (req.session.username) {
            let results = await pool.query("SELECT Content, PostTime FROM Entries WHERE Username = ? ORDER BY EntryID DESC LIMIT 5 OFFSET 0;", [req.session.username]);
            res.status(200).send(results);
        } else {
            res.status(400).end("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});
