const common = require("./webpack.common.js");

module.exports = Object.assign({
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        proxy: {
            "/": "http://localhost:3000"
        },
        // Use port >= 1024 so Linux doesn't require root
        port: 8080
    }
}, common);
