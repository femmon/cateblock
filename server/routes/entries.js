const express = require("express");
const fs = require("fs");
const archiver = require("archiver");
const pool = require("../db");

const router = express.Router();

// Delete
router.delete("/", async (req, res) => {
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

// View entries
router.get("/:offset(\\d+)", async (req, res) => {
    try {
        if (req.session.username) {
            let offset = Number(req.params.offset) || 0;
            let results = await pool.query("SELECT EntryID, Content, PostTime, Edited FROM Entries WHERE Username = ? ORDER BY EntryID DESC LIMIT 5 OFFSET ?;", [req.session.username, offset]);
            res.status(200).send(results);
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

// Create entry
router.post("/", async (req, res) => {
    try {
        if (req.session.username) {
            let content = req.body.content;
            let query = "INSERT INTO Entries VALUES " + Array(content.length).fill("(0, \"" + req.session.username + "\", ?, DEFAULT, DEFAULT)").join(", ") + ";";
            let results = await pool.query(query, [...content]);
            res.status(200).send(results.insertId.toString());
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

// Edit
router.put("/", async (req, res) => {
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

// Download post
router.get("/all", async (req, res) => {
    try {
        if (req.session.username) {
            // Prepare content to send
            let [results, templateContent] = await Promise.all([
                pool.query("SELECT Content, PostTime FROM Entries WHERE Username = ? ORDER BY EntryID DESC;", [req.session.username]),
                // fs.promises.readFile("path-to-template.html", {encoding: "utf-8"})
            ]);
            results = JSON.stringify(results, undefined, 2);

            let rawContent = results.replace(/\\n/g, "\n");

            // // identifier is a placeholder for the posts in the template
            // let identifier = "placeholder";
            // let position = templateContent.indexOf(identifier);
            // // Replace "\n" in the output file with visual newline
            // templateContent = templateContent.slice(0, position) +
            //                   results +
            //                   templateContent.slice(position + identifier.length);

            let outputPath = `${req.session.username}-posts.zip`;

            // Wrapped in promise so that we don't send the zip before it finishs
            await new Promise(res => {
                // Set up output
                let output = fs.createWriteStream(outputPath);
                output.on("close", res);

                // Set up archiver
                let archive = archiver("zip");
                archive.on("error", err => {
                    throw err;
                });
                archive.pipe(output);

                archive.append(rawContent, {name: "raw-text.txt"});
                // archive.append(templateContent, {name: "web-viewer.html"});
                archive.finalize();
            });

            // This will end the response: https://expressjs.com/en/guide/routing.html#response-methods
            res.status(200).download(
                outputPath,
                outputPath,
                err => {
                    if (err) throw err;
                    fs.unlink(outputPath, (err) => {
                        if (err) throw err;
                    });
                }
            );
        } else {
            res.status(400).send("Need to log in first");
        }
    } catch (err) {
        throw err;
    }
});

// View history
router.get("/history/:entryID(\\d+)", async (req, res) => {
    try {
        if (req.session.username) {
            let entryID = req.params.entryID;
            let connection = await pool.getConnection();
            let results = await pool.query("SELECT COUNT(*) FROM Entries WHERE Username = ? AND EntryID = ?;", [req.session.username, entryID], connection);
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
    // SELECT Content, PostTime FROM History WHERE EntryID = ? AND EXITSTS (SELECT * FROM Entries WHERE Username = ? AND EntryID = ?) ORDER BY Generations;
});

module.exports = router;
