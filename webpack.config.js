var path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: {
            import: './src/app.js',
        }
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/icons", to: "icons" }
            ],
            options: {
                concurrency: 100,
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: "lib", to: "lib" }
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: 'RJsonParser',
        globalObject: 'this',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ],
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',

};