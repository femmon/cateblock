const express = require("express");
const helmet = require("helmet");
const session = require("./server/session");
const accountsRouter = require("./server/routes/accounts");
const entriesRouter = require("./server/routes/entries");
const path = require("path");
const PORT = process.env.PORT || 80

const app = express();
app.use(helmet());
if (process.env.NODE_ENV != "development") {
    app.get("*", (req, res, next) => {
        if (req.headers["x-forwarded-proto"] != "https") {
            res.redirect("https://" + req.hostname + req.url);
        }
        else {
            next();
        }
    });
}
app.use(session());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(accountsRouter);
app.use(entriesRouter);
app.use(express.static(path.join(__dirname, "client/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
})
app.listen(PORT);
