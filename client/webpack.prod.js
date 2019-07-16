const common = require("./webpack.common.js");

//This is to set env value of Babel
process.env.NODE_ENV = "production";

module.exports = Object.assign({
    mode: "production",
}, common);
