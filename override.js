let util = require("util");
let _ = require('lodash');

module.exports = neutrino => {
    /* We dont want the whole src directory copied on deploy, so we disable the copy plugin */
    /* console.log(util.inspect(neutrino)); */

    /* From the docs:
       https://neutrino.js.org/customization/advanced.html#configuring

       The Neutrino instance provided to your custom configurator has a config
       property that is an instance of webpack-chain. */

    let isCopyPluginLoaded = !_.isUndefined(neutrino.config.plugins.options.get('copy'));
    /* Dont copy anything */
    if(isCopyPluginLoaded) {
        neutrino.config.plugin('copy').args = [ ];
    }

    /* See the neutrino web preset here:
       https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino-preset-web/index.js
       See also how to configure vendoring:
       https://neutrino.js.org/presets/neutrino-preset-web/#vendoring
    */



    neutrino.config.entry('vendor').add('react');
    neutrino.config.entry('vendor').add('react-dom');
    neutrino.config.entry('vendor').add('lodash');
    return neutrino;
};
