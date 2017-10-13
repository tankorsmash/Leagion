const config = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.entry.vendor = config.entry.vendor.concat([
    'webpack-dev-server/client?http://localhost:20034',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
]);

config.output.publicPath = 'http://localhost:20034/assets/bundles/';

config.entry.clib = [
    './assets/js/clib/index'
];

config.plugins = config.plugins.concat([
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new ExtractTextPlugin({
		filename: '[name].css',
	}),
]);

config.devServer = {
	host: 'localhost',
	port: 20034,

	historyApiFallback: true,
	// respond to 404s with index.html
	headers: { 'Access-Control-Allow-Origin': '*'  },

	inline: true,
	hot: true,
	// enable HMR on the server
};

module.exports = config;
