/* eslint-env browser */

import Promise from 'promise-polyfill'; 

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

import 'whatwg-fetch';


import React from "react";
import { render } from "react-dom";

let Routes  = require("./js/routes").default;
let Sidebar = require("./js/pages/components/sidebar").default;

// Import styles
require("style-loader!raw-loader!./css/fonts.css");
require("style-loader!css-loader!less-loader!./less/main.less");


render(<div><Sidebar /><Routes /></div>, document.getElementById("app"));
