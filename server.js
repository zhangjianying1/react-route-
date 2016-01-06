var webpack = require("webpack")
var webpackDevServer=require("webpack-dev-server")
var config = require("./webpack.config.js");

config.entry.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server","./src/main.js");

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    publicPath: "http://localhost:8080/dist/",
    hot: true,
    quiet: true,
    noInfo: false,
    filename: "build.js",
    historyApiFallback: false,
    stats: { colors: true },
    proxy: {
        "/test/*": {
            target:"http://localhost:8088",
            secure: false,
        }
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
});
server.listen(8080);
