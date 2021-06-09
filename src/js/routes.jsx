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

let goAOS = () => { 
        console.log("Forcing redirect");
        window.location.href = 'https://www.notion.so/Advanced-Operating-Systems-A-A-2021-2022-Polimi-f77b9fb8c9ea43ea953f40c35b84593a'; return null; }

class Routes extends React.Component {
  render() {
    return (
      <div className="site_container">
        <Router history={history}>
          <div>
            <Route exact path="/" component={bioPage} />
            <Route path="/research" component={researchPage} />
            <Route path="/r/aos" component={ goAOS } />
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
