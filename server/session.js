const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");

module.exports = () => {
    let client = redis.createClient({
        url: process.env.REDIS_URL
    });

    let sessionConfig = {
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        name: "sessionID",
        proxy: true,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        secret: "gUqtn/Lz4tmYD5S/8Lj1zdtgOjTDd4Rn3qOH2hYEdtc=",
        store: new RedisStore({client})
    };
    if (process.env.NODE_ENV !== "development") {
        sessionConfig.cookie.secure = true;
    }
    return session(sessionConfig);
}
