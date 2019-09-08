const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const toGzipName = require("../utils/to-gzip-name");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist"),
        // Resources need to be reference relative to root like "catblo.ck/script.js".
        // If publicPath = "", then when the script is run from "catblo.ck/two/layers",
        // the script will be loaded from "catblo.ck/two/script.js"
        publicPath: "/"
    },
    // loaders run before plugins.
    // Loaders work at individual file level during or before the bundle is generated.
    // Plugins is more powerful. They work at bundle or chunk level, usually at
    // the end of the bundle generation process.
    module: {
        // Loaders are processed from from bottom to top inside rules: image ->
        // css -> html -> js, and ftom right to left inside use of rules: css ->
        // style loader
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
                // Babel run order (as inside .babelrc):
                // - Plugins run before Presets.
                // - Plugin ordering is first to last.
                // - Preset ordering is reversed (last to first).

                // Babel considers files to be ES module by default: `"sourceType":
                // "module"` and automatically inserts `"use strict";`.
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
                // use this in JS by import LINK from IMAGEPATH and <img src={LINK}>
                // or in CSS by background: url(IMAGEPATH)
                // or in HTML by <img src=IMAGEPATH/>
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: path.resolve(__dirname, "src/favicon.ico")
        }),
        new CompressionPlugin({
            filename(info) {
                // Change name to serve from Express more easily
                return toGzipName(info.path);
            }
        })
    ]
};
