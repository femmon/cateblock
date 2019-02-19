const common = require("./webpack.common.js");

module.exports = Object.assign({
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        proxy: {
            "/": "http://localhost:3000"
        },
        port: 80
    }
}, common);
