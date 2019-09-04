const express = require("express");
const helmet = require("helmet");
const session = require("./server/session");
const accountsRouter = require("./server/routes/accounts");
const entriesRouter = require("./server/routes/entries");
const staticRouter = require("./server/static");
// Use port >= 1024 so Linux doesn't require root
const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet());
if (process.env.NODE_ENV !== "development") {
    app.get("*", (req, res, next) => {
        if (req.headers["x-forwarded-proto"] !== "https") {
            res.redirect("https://" + req.hostname + req.url);
        }
        else {
            next();
        }
    });
}
app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/accounts", accountsRouter);
app.use("/entries", entriesRouter);

app.use(staticRouter);

app.listen(PORT);
