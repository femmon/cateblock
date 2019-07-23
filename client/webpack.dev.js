const common = require("./webpack.common.js");

module.exports = Object.assign({
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        // When using http://localhost:3000, this will correct the websocket
        // path for live reloading (else it will send depend on the current
        // address, e.g. http://localhost:3000/socket-path).
        // (8080 is the default port of webpack-dev-server)
        public: "http://localhost:8080",
        writeToDisk: true,
    }
}, common);
