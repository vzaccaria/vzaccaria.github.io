import React from 'react';
import { render } from 'react-dom';
import { createSidebarComponentHTML } from './sidebar';
import { Routes } from './routes';
import _ from 'lodash'
var $script = require("scriptjs");

// Debug..
const debug = require('./react-utils/debug')(__filename);

let siteData = require('site-config');

if(_.get(siteData, "webPackDevServer", false)) {
//    $script("http://localhost:8080/webpack-dev-server.js", () => {
//        console.log("Using webpack-dev-server");
//        });
}

// Main ideas taken from: http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/


// Import styles
require("style!../css/fonts.css");
require("!style!css!less!../less/main.less");
require("!style!css!less!highlight.js/styles/solarized_light.css");

// Render sidebar
document.getElementById('sidebar').innerHTML = createSidebarComponentHTML();

render(<Routes />, document.getElementById('content'))
