const session = require("express-session");
const RedisStore = require("connect-redis")(session);

// redis://user:password@host:port
let layout = /^redis:\/\/(.+):(.+)@(.+):(\d+)$/.exec(process.env.REDIS_URL);

module.exports = () => {
    return session({
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
        cookie: {
            maxAge: 60 * 60 * 1000 ,
            secure: true
        }
    })
}
