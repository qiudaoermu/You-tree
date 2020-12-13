
var { merge } = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
let config = {
    mode: 'development',
    devServer: {
        port: 8082,
        host: '0.0.0.0',
        overlay: {
            errors:true,
        },
        hot:true
    },
    devtool: "#cheap-module-eval-source-map"
};
config= merge(baseWebpackConfig, config);
module.exports = config;
