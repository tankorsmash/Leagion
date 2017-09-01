const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = require('./webpack.config.js');

config.output.filename = "[name]-[hash].js";
config.output.path = path.resolve(__dirname, './static');
config.output.publicPath = undefined;
config.devtool = undefined;

config.plugins = [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.ProvidePlugin({
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('[name]-[hash].css')
];

module.exports = config;

