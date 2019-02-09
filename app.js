const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const accountsRouter = require("./routes/accounts");
const entriesRouter = require("./routes/entries");
const path = require("path");
const PORT = process.env.PORT || 5000

const app = express();
app.use(helmet());
// redis://user:password@host:port
let layout = /^redis:\/\/(.+):(.+)@(.+):(\d+)$/.exec(process.env.REDIS_URL);
app.use(session({
    name: "sessionID",
    secret: "gUqtn/Lz4tmYD5S/8Lj1zdtgOjTDd4Rn3qOH2hYEdtc=",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: new RedisStore({
        host     : layout[3],
        user     : layout[1],
        password : layout[2],
        port     : layout[4],
    }),
    // cookie: { maxAge: 60 * 60 * 1000 }
    cookie: { maxAge: 1 * 60 * 1000 }
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(accountsRouter);
app.use(entriesRouter);
app.use(express.static(path.join(__dirname, "client/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
})
app.listen(PORT);
