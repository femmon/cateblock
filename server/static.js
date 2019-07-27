const express = require("express");
const path = require("path");
const router = express.Router();

const distFolder = path.join(__dirname, "../client/dist");

// Use gzipped file name as name.gz.extension so that I don't have to manually
// change Content-Type to match each resource (The Content-Type will be gzip
// and wouldn't display if I send .gz file without manually set Content-Type).

// "*.*" is placed before "/" so that after rewriting the request to "/" into
// "/index.gz.html", the request wouldn't fall into "*.*" afterward.
router.get("*.*", function(req, res, next) {
    if (req.get("Accept-Encoding").indexOf("gzip") !== -1) {
        let lastDot = req.url.lastIndexOf(".");
        req.url = req.url.slice(0, lastDot) + ".gz" + req.url.slice(lastDot);
        res.set("Content-Encoding", "gzip");
    }
    next();
});

router.get("/", function(req, res, next) {
    if (req.get("Accept-Encoding").indexOf("gzip") !== -1) {
        req.url = "/index.gz.html";
        res.set("Content-Encoding", "gzip");
    }
    next();
});

router.use(express.static(distFolder));

router.get("*", (req, res) => {
    if (req.get("Accept-Encoding").indexOf("gzip") !== -1) {
        res.set("Content-Encoding", "gzip");
        res.status(404).sendFile(distFolder + "/index.gz.html");
    } else {
        res.status(404).sendFile(distFolder + "/index.html");
    }
});

module.exports = router;
