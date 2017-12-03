const webpack = require("webpack");
const _ = require("lodash");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

const uglifier = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  sourceMap: true
});

const compressor = new CompressionPlugin({
  asset: "[path].gz[query]",
  algorithm: "gzip",
  regExp: /\.js$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
});

function getLoaders() {
  return [
    {
      test: /\.js[x]?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
      options: {
        presets: ["react", "babel-preset-es2015"]
      }
    },
    {
      test: /\.css$/, // Only .css files
      loader: "style-loader!css-loader" // Run both loaders
    },
    {
      test: /\.json/,
      loader: "json-loader"
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        {
          loader: "file-loader",
          query: {
            publicPath: "assets/img",
            outputPath: "assets/img"
          }
        },
        {
          loader: "image-webpack-loader",
          query: {
            publicPath: "assets/img",
            outputPath: "assets/img",
            mozjpeg: {
              quality: 35,
              progressive: true
            },
            optipng: {
              optimizationLevel: 7
            },
            gifsicle: {
              interlaced: false
            },
            pngquant: {
              quality: "65-90",
              speed: 4
            }
          }
        }
      ]
    }
  ];
}

const htmlPlugin = new HtmlWebpackPlugin({
  /* See here: https://github.com/jaketrent/html-webpack-template#basic-usage for options*/
  template: require("html-webpack-template"),
  title: "Vittorio Zaccaria - Home page",
  favicon: __dirname + "/src/sketch/favicon.png",
  appMountId: "app",
  inject: false,
  mobile: true
});

const removeMomentLocales = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

const mainConfig = {
  entry: "./src/index.js",
  output: {
    path: `${__dirname}`,
    filename: "assets/client.js",
    publicPath: ""
  },
  node: {
    __filename: true
  },
  module: {
    loaders: getLoaders()
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      lodash: `${__dirname}/vendor/lodash.custom.js`
    }
  },
  plugins: [uglifier, compressor, htmlPlugin, removeMomentLocales]
};

function getDevConfig(devConfig) {
  _.set(devConfig, "devtool", "source-map");
  _.set(devConfig, "devServer.headers.Access-Control-Allow-Origin", "*");
  _.set(devConfig, "plugins", [
    new DashboardPlugin(),
    htmlPlugin,
    removeMomentLocales
  ]);
  return devConfig;
}

const production = _.get(process.env, "PROD", false);

if (!production) {
  module.exports = getDevConfig(mainConfig);
  console.log("**DEVELOPMENT BUILD**");
  console.log(JSON.stringify(module.exports, 0, 4));
} else {
  if (production) {
    module.exports = mainConfig;
    console.log("**PRODUCTION BUILD**");
    console.log(JSON.stringify(module.exports, 0, 4));
  }
}
