const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = require('./webpack.common.js');

config.devtool = undefined;
config.output.filename = "[name]-[hash].js";
config.output.publicPath = '/static/';

config.plugins = config.plugins.concat([
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
	new ExtractTextPlugin({
		filename: '[name]-[hash].css',
	}),
]);

module.exports = config;

