const express = require("express");
const helmet = require("helmet");
const session = require("./server/session");
const accountsRouter = require("./server/routes/accounts");
const entriesRouter = require("./server/routes/entries");
const path = require("path");
const PORT = process.env.PORT || 5000

const app = express();
app.use(helmet());
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
