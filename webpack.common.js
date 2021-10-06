const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: {
        main: "./src/index.ts",
        vendor: "./src/vendor.ts"
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html",
    })],
    module: {
        rules: [
            
            {
                test:/\.ts$/,
                exclude: /node_modules/,
                use:{
                    loader: "ts-loader",
                }
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
        ]
    },
}