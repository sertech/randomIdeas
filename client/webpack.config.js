// nodejs have a path module built in to handle the OS files and paths
// path.resolve() let us use absolute paths __dirname means current directory
// the 'dist' is the folder where we want the output
const path = require('path');

// plugin config
const HtmlWebpackPlugin = require('html-webpack-plugin');

// the css minify plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../public'),
        },
        port: 3000,
        open: {
            app: { name: 'chrome' },
        },
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};

//  the loader configuration goes inside the rules inside the module object
// each rule has 2 parts
// 1) test that uses regular expressions so in test:/\.css$/,
//    we are saying this goes to all files with the extension .css
// 2) use which is an array that contains the loaders we will use

// plugin is added after the module is an array
// inside that array we have to create an instance of the plugin
// and configure it, in the case of html-webpack-plugin there are
// lots of options but the most important is template it will be the
// base html that will be compiled in the dist folder
