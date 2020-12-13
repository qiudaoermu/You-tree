const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require("webpack");
const isDev = process.env.NODE_ENV;
const kid = process.env.vip;
console.log(isDev);
// require("@babel/polyfill");
//console.log(global)
const HTMLplugin = require("html-webpack-plugin");
const resolve = dir => path.resolve(__dirname, dir);
var CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
let config = {
    mode: 'development',
    entry: {
        content: path.join(__dirname,'src/index.js'),
        background: path.join(__dirname,'src/background.js'),
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
                include: [path.resolve(__dirname, '../node_modules/element-ui'), path.resolve(__dirname, './src')]
            },
            {
                test: /\.(jsx|js)$/,
                loader: "babel-loader",
                include: [path.resolve(__dirname, './src'), path.resolve(__dirname, '../node_modules/element-ui')]
            },
            {
               test:/\.css$/,
               use:[
                   'style-loader',
                   'css-loader'
               ]
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
        new CopyWebpackPlugin([{
            from: './src/assets/images',
            to: 'src/assets/images',
        },{
            from: './src/manifest.json',
            to: 'manifest.json'},
            {
                from: './src/icons',
                to: 'icons'}
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: isDev==='development' ? '"development"' : '"production"'
        }),//定义可以在前端使用的全局变量
        new HTMLplugin(),
        // new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
            })
    ]
};

if (isDev=="development") {
    config.devtool = "#cheap-module-eval-source-map";
    config.devServer = {
        port: 8082,
        host: '0.0.0.0',
        overlay: {
            errors:true,
        },
        hot:true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config;
