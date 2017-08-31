var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var yargs = require('yargs');

if (yargs.argv.debug) {
	var devVendor = ['webpack-dev-server/client?http://localhost:20034'];
	var publicPath = 'http://localhost:20055/assets/bundles/';
}
else {
	var devVendor = [];
    var publicPath = 'static/';
}

module.exports = modulePaths => ({
    context: __dirname,

    devtool: 'eval-source-map',

    entry: {
        vendor: devVendor.concat([
            'babel-polyfill',
            'react-hot-loader/patch',
            "expose-loader?React!react",
            "expose-loader?$!expose-loader?jQuery!jquery/dist/jquery.slim",
            "expose-loader?toastr!toastr",
            'webpack/hot/only-dev-server',
            'whatwg-fetch',
            './assets/js/vendor/index',
        ]),
        main: [
            './assets/js/main/index'
        ]
    },
    output: {
        publicPath: publicPath,
        path: path.resolve('./static/'),
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
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-2'],
                plugins: ["react-hot-loader/babel"]
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    }
                } ,{
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: modulePaths
                    }
                }]
            }),
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader')
        },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ],
    },

    resolve: {
        modules: [
            'node_modules',
            'bower_components',
            path.resolve(__dirname, 'assets/js/'),
            path.resolve(__dirname, 'assets/style/'),
        ],
        extensions: ['*', '.js', '.js', '.scss', '.css'],
    },

    devServer: {
        host: 'localhost',
        port: 20034,

        historyApiFallback: true,
        // respond to 404s with index.html
        headers: { 'Access-Control-Allow-Origin': '*'  },

        inline: true,
        hot: true,
        // enable HMR on the server
    },
})
