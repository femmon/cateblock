const express = require("express");
const path = require("path");
const fs = require("fs");
const toGzipName = require("../utils/to-gzip-name");

const router = express.Router();

const distFolder = path.join(__dirname, "../client/dist");

const isGzipAvailale = (() => {
    // Compute once on start up
    const distFiles = fs.readdirSync(distFolder);

    return async req => {
        // Check for client support
        if (req.get("Accept-Encoding").indexOf("gzip") === -1) return false;

        const gzipUrl = toGzipName(req.url);

        // Check if server has the gzip version
        if (process.env.NODE_ENV !== "development") {
            // For production, since the client only build assets once before
            // running the server, we can check against the compute-once file
            // list `distFiles`
            // `slice(1)` to remove the initial slash ("/")
            return distFiles.includes(gzipUrl.slice(1));
        } else {
            // For development, since the backend and frontend is refresh
            // independently, the check will run directly on the file system
            return await fs.promises.access(distFolder + gzipUrl)
            .then(() => true)
            .catch(() => false);
        }
    }
})();

// Set file name explicitly to match next middleware patter, so that the next
// middleware can use gzip if needed
router.get("/", function(req, res, next) {
    req.url = "/index.html";
    next();
});

// Use gzipped file name as name.gz.extension so that I don't have to manually
// change Content-Type to match each resource (The Content-Type will be gzip
// and wouldn't display if I send .gz file without manually set Content-Type).
router.get("*.*", async function(req, res, next) {
    if (await isGzipAvailale(req)) {
        req.url = toGzipName(req.url);
        res.set("Content-Encoding", "gzip");
    }
    next();
});

router.use(express.static(distFolder));

router.get("*", async (req, res) => {
    req.url = "/index.html";

    if (await isGzipAvailale(req)) {
        req.url = toGzipName(req.url);
        res.set("Content-Encoding", "gzip");
    }

    res.status(404).sendFile(distFolder + req.url);
});

module.exports = router;
