
var { merge } = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
let config = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
      },
    plugins: [
        new CopyWebpackPlugin([
        {
            from: './src/assets/images',
            to: 'src/assets/images',
        },
        {
            from: './src/manifest.json',
            to: 'manifest.json'
        },
        {
            from: './src/icons',
            to: 'icons'
        }
        ])
    ]
};
config = merge(baseWebpackConfig, config);
module.exports = config;