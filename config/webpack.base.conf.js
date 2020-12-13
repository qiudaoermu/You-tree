const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require("webpack");
const HTMLplugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);
let config = {
    entry: {
        content: path.join(__dirname,'../src/index.js'),
        background: path.join(__dirname,'../src/background.js'),
      },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
      },
    resolve:{
        extensions:['.js','.jsx','.json','.vue']//表示这几个的后缀名可以参略
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include: [path.resolve(__dirname, '../src')]
            },
            {
                test: /\.(jsx|js)$/,
                loader: "babel-loader",
                include: [path.resolve(__dirname, '../src')]
            },
            {
               test:/\.css$/,
               use:[
                   'style-loader',
                   'css-loader'
               ]
            },
            {
                test: /\.csv$/,
                loader: ['raw-loader'],
                include: [path.resolve(__dirname, '../src')]
            },
            {
              test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },

            {
                test:/\.(gif|jpg|jpeg|png|svg|ttf|woff)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000000,
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLplugin(),
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
            })
    ]
};

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
)
module.exports = config;
