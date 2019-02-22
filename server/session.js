const session = require("express-session");
const RedisStore = require("connect-redis")(session);

// redis://user:password@host:port
let layout = /^redis:\/\/(.+):(.+)@(.+):(\d+)$/.exec(process.env.REDIS_URL);

module.exports = () => {
    let sessionConfig = {
        cookie: {
            maxAge: 60 * 60 * 1000 ,
        },
        name: "sessionID",
        proxy: true,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        secret: "gUqtn/Lz4tmYD5S/8Lj1zdtgOjTDd4Rn3qOH2hYEdtc=",
        store: new RedisStore({
            host    : layout[3],
            user    : layout[1],
            password: layout[2],
            port    : layout[4],
        })
    };
    if (process.env.NODE_ENV !== "development") {
        sessionConfig.cookie.secure = true;
    }
    return session(sessionConfig);
}
