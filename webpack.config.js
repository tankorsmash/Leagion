var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,

    devtool: 'source-map',

	entry: {
		vendor: [
			'react-hot-loader/patch',
			// react hot loader

			'webpack-dev-server/client?http://localhost:20034',
			// bundle the client for webpack-dev-server
			// and connect to the provided endpoint

			'webpack/hot/only-dev-server',
			// bundle the client for hot reloading
			// only- means to only hot reload for successful updates<Paste>

			'babel-polyfill',
			'whatwg-fetch',
		],
		main: [
			'./assets/js/main/index',
		],
		public: [
			'./assets/js/public/index',
		],
	},

    output: {
        publicPath: 'http://localhost:20034/assets/bundles/',
        path: path.resolve('./assets/bundles/'),
        filename: "[name].js",
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// do not emit compiled assets that include errors
        new webpack.ProvidePlugin({
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
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
                presets: ['es2015', 'react'],
				plugins: ["react-hot-loader/babel"]
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
