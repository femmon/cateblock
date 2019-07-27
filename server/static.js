const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "../client/dist")));

router.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../client/dist/index.html"));
});

module.exports = router;
