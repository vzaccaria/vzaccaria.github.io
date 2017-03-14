let util = require("util");

module.exports = neutrino => {
    /* Dont copy anything */
    neutrino.config.plugin('copy').args = [ ];
    console.log(util.inspect(neutrino.config.plugin('copy').args));
};
