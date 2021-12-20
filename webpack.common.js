const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: {
        main: {
            import: "./src/index.ts",
            dependOn: "vendor",
        },
        vendor: "./src/vendor.ts",
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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
            }
        ]
    },  
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
}