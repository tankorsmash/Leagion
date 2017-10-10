const config = require('./webpack.common.js');

config.entry.vendor = config.entry.vendor.concat([
    'webpack-dev-server/client?http://localhost:20034',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
]);

config.output.publicPath = 'http://localhost:20034/assets/bundles/';

config.entry.clib = [
    './assets/js/clib/index'
];

module.exports = config;
