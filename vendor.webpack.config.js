var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = modulePaths => ({
    entry: {
        vendor: [
            "expose-loader?React!react",
            "expose-loader?$!expose-loader?jQuery!jquery/dist/jquery.slim",
            "expose-loader?toastr!toastr",
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:20034',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            'whatwg-fetch',
            './assets/js/vendor/index',
        ],
    },

    output: {
        filename: 'vendor.bundle.js',
        path: path.resolve(__dirname, './assets/dll/'),

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: 'vendor_lib',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
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
                loader: 'file-loader?name=fonts/vendor.[ext]'
            }
        ],
    },

    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: './assets/dll/vendor-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: 'vendor_lib'
        }),
        new ExtractTextPlugin('vendor.css'),
    ],
})
