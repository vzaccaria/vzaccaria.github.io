import React from "react";
import { render } from "react-dom";

let Routes  = require("./js/routes").default;
let Sidebar = require("./js/pages/components/sidebar").default;

// Import styles
require("style-loader!raw-loader!./css/fonts.css");
require("style-loader!css-loader!less-loader!./less/main.less");
/* require("!style-loader!css-loader!less!highlight.js/styles/solarized_light.css"); */ 


render(<div><Sidebar /><Routes /></div>, document.getElementById("root"));