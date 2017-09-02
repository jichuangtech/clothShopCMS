var webpack = require("webpack")
var path = require("path")

module.exports = {
    entry: "./app/entry.js",
    output: {
        path: __dirname,
        filename: "./build/bundle.js",
        publicPath:"./"
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
};