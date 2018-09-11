import React from "react";
import { createHashHistory } from "history";

let { Router, Route } = require("react-router");
let { bioPage } = require("./pages/bio").default;
let { researchPage } = require("./pages/research").default;
let BlogPage = require("./pages/blog").default;
let BlogIndex = require("./pages/blogIndex").default;
let SlidesPage = require("./pages/slides").default;
let AddressPage = require("./pages/address").default;
let { videosPage } = require("./pages/videos").default;
let { ThesisIndex, ThesisPage }= require('./pages/thesis').default;

let history = createHashHistory({
  queryKey: false
});

class Routes extends React.Component {
  render() {
    return (
      <div className="site_container">
        <Router history={history}>
          <div>
            <Route exact path="/" component={bioPage} />
            <Route path="/research" component={researchPage} />
            <Route path="/teaching" component={SlidesPage} />
            <Route path="/videos" component={videosPage} />
            <Route path="/address" component={AddressPage} />
            <Route exact path="/thesis" component={ThesisIndex} />
            <Route path="/thesis/:id" component={ThesisPage} />
            <Route exact path="/:category" component={BlogIndex} />
            <Route
              path="/:category/:year/:month/:day/:title"
              component={BlogPage}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default Routes;
