var webpack = require('webpack')
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var dev = true;


module.exports = {
    entry: {
        main: './src/app.js',
        vendors: ['react-router', 'superagent', 'react-dom', 'react']
    },
    output: {
        path: dev ? 'src/__build' : path.resolve(__dirname + '/src/dist/'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[chunkhash:8].chunk.min.js'
    },
    module: {
        loaders: [
            {test:/\.js$/, loader:"babel", exclude: /(node_modules|bower_components)/,query: {presets: ['es2015', 'react']}},
            {test: /\.css$/, loader: "style-loader!css"}
        ]
    },
    resolve: {
        extensions :['', '.js', '.json']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('js/common.js')

    ]
}