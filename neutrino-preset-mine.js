/* global process */
/* eslint-env node */

let util = require("util");

let CompressionPlugin = require("compression-webpack-plugin");

function showPluginArgs(neutrino, pn) {
  console.log(util.inspect(neutrino.config.plugin(pn).args));
}

function show(s) {
  console.log(util.inspect(s));
}

module.exports = neutrino => {
  /* We dont want the whole src directory copied on deploy, so we disable the
     copy plugin.

     "The Neutrino instance provided to your custom
     configurator has a config property that is an instance of webpack-chain."

     https://neutrino.js.org/presets/neutrino-preset-web/#vendoring
     https://neutrino.js.org/customization/advanced.html#configuring

     https://github.com/mozilla-neutrino/webpack-chain/tree/v1.4.3
     https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino-preset-web/index.js

     https://github.com/vzaccaria/vzaccaria.github.io/blob/master/webpack.config.js
  */

  neutrino.config.plugin("html").args[
    0
  ].title = "Vittorio Zaccaria - Home Page";
  neutrino.config.plugin("html").args[0].favicon = "./favicon.png";

    neutrino.config.module.rule("compile").loader("babel", ({options}) => {
        options.presets[0][1].targets.browsers = ['safari 7', 'ios 7'];
        return {options};
  });

  if (process.env.NODE_ENV === "production") {
    /* We separate big dependencies into their own bundle. */

    /* Polyfills go first */
    neutrino.config.entry("vendor").add("promise-polyfill");
    neutrino.config.entry("vendor").add("whatwg-fetch");

    /* Then the rest */
    neutrino.config.entry("vendor").add("react");
    neutrino.config.entry("vendor").add("react-dom");
    neutrino.config.entry("vendor").add("lodash");
    neutrino.config.entry("vendor").add("moment");

    /* Copy images into assets */
    neutrino.config.module.rule("img").loader("url", ({ options }) => {
      /* See file-loader (url-loader)
         https://github.com/webpack-contrib/url-loader
         https://github.com/webpack-contrib/file-loader */
      options.name = "assets/[hash].[ext]";
      return { options };
    });

    /* Output bundle into assets */
    neutrino.config.output.publicPath("");
    neutrino.config.output.path(__dirname);
    neutrino.config.output.filename("assets/[name].[chunkhash].bundle.js");

    /* Dont copy anything form src */
    neutrino.config.plugin("copy").args = [];

    /* Cleanup assets */
    neutrino.config.plugin("clean").args = [
      [`${__dirname}/assets`],
      { root: __dirname }
    ];

    /* Compress files */

    neutrino.config.plugin("compress").use(CompressionPlugin, {
      asset: "[path].gz[query]",
      algorithm: "gzip",
      regExp: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    });
  }
  return neutrino;
};
