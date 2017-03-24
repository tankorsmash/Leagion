var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,

    devtool: 'source-map',

	entry: {
		vendor: [
			'babel-polyfill',
			'whatwg-fetch',
		],
		admin: [
			'./assets/js/admin/index',
		],
		common: [
			'./assets/js/common/index',
		]
	},

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name].js",
    },

    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new BundleTracker({filename: './webpack-stats.json'}),
		new ExtractTextPlugin('[name].css'),
    ],

    module: {
        loaders: [{ 
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        } , {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader')
        }],
    },

    resolve: {
        modules: [
            'node_modules',
            'bower_components',
            path.resolve(__dirname, 'assets/js/'),
        ],
        extensions: ['*', '.js', '.jsx'],
    },
}
