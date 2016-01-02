var webpack = require('webpack')
var _ = require('lodash')
var CompressionPlugin = require("compression-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')



var uglifier = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    sourceMap: true
})

var compressor = new CompressionPlugin({
    asset: "{file}.gz",
    algorithm: "gzip",
    regExp: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
})

function getLoaders() {
    return [{
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
    }, {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
    }, {
        test: /\.json/,
        loader: 'json-loader'
    }]
}

var htmlPlugin = new HtmlWebpackPlugin({
    title: "Vittorio Zaccaria - Home page",
    filename: "index.html",
    template: __dirname + "/src/html/index.html",
    favicon: __dirname + "/src/sketch/favicon.png"
});


var mainConfig = {
    entry: './src/js/index.jsx',
    output: {
        path: __dirname,
        filename: '/assets/client.js',
        publicPath: '/'
    },
    node: {
        __filename: true
    },
    module: {
        loaders: getLoaders()
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "site-config": __dirname + "/data/site.json"
        }
    },
    plugins: [uglifier, compressor, htmlPlugin]
}

function getStageConfig(stageConfig) {
    _.set(stageConfig, "output.path", __dirname);
    _.set(stageConfig, "output.publicPath", '/website-light');
    _.set(stageConfig, "resolve.alias.site-config", __dirname + "/data/site-stage.json");
    _.set(stageConfig, "plugins", [htmlPlugin, uglifier, compressor]);
    return stageConfig
}


function getDevConfig(devConfig) {
    _.set(devConfig, "output.publicPath", '');
    _.set(devConfig, "resolve.alias.site-config", __dirname + "/data/site-dev.json");
    _.set(devConfig, "devtool", "source-map");
    _.set(devConfig, "devServer.headers.Access-Control-Allow-Origin", "*");
    _.set(devConfig, "plugins", [htmlPlugin]);
    return devConfig
}


var production = _.get(process.env, "PROD", false);
var stage = _.get(process.env, "STAGE", false);

if (!production && !stage) {
    module.exports = getDevConfig(mainConfig);
    console.log("**DEVELOPMENT BUILD**");
    console.log(JSON.stringify(module.exports, 0, 4));
} else {
    if (production) {
        module.exports = mainConfig
        console.log("**PRODUCTION BUILD**");
        console.log(JSON.stringify(module.exports, 0, 4));
    } else {
        module.exports = getStageConfig(mainConfig);
        console.log("**STAGE BUILD**");
        console.log(JSON.stringify(module.exports, 0, 4));
    }
}
