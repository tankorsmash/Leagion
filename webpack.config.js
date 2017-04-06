var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,

    devtool: 'eval',

	entry: {
		vendor: [
            "expose-loader?React!react",
            "expose-loader?$!jquery/dist/jquery.slim",
            "expose-loader?toastr!toastr",
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:20034',
			'webpack/hot/only-dev-server',
			'babel-polyfill',
			'whatwg-fetch',
			'./assets/js/vendor/index',
		],
		main: [
			'./assets/js/main/index'
		]
	},

    output: {
        publicPath: 'http://localhost:20034/assets/bundles/',
        path: path.resolve('./assets/bundles/'),
        filename: "[name].js",
        devtoolModuleFilenameTemplate: '/[absolute-resource-path]', //for redbox stack trace
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
                presets: ['es2015', 'react', 'stage-2'],
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
        extensions: ['*', '.js', '.jsx', 'css'],
    },
}
