var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,

    devtool: 'eval-source-map',

    entry: {
        vendor: [
            'babel-polyfill',
            "expose-loader?React!react",
            "expose-loader?$!expose-loader?jQuery!jquery/dist/jquery.slim",
            "expose-loader?toastr!toastr",
            'whatwg-fetch',
            './assets/js/vendor/index',
        ],
        main: [
            './assets/js/main/index'
        ],
        common: [
            './assets/js/common/index'
        ]
    },
    output: {
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
                use: ['css-loader', 'postcss-loader', 'sass-loader']
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
};