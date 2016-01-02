import React from 'react';
import { createHashHistory} from 'history'

import { Router, Route, Link, IndexRoute } from 'react-router'

import { bioPage } from './pages/bio';
import { researchPage } from './pages/research';
import BlogPage from './pages/blog'
import BlogIndex from './pages/blogIndex';
import TeachingPage from './pages/teaching';
import AddressPage from './pages/address';
import { projectsPage } from './pages/projects';
import { videosPage } from './pages/videos';

const debug = require('./react-utils/debug')(__filename);

let history = createHashHistory ({
    queryKey: false
});

let Routes = React.createClass({
    render() {
        return (
            <div className="site_container" >
                <Router history={history}>
                    <Route path="/" >
                        <IndexRoute component={bioPage} />
                        <Route path="/research" component={researchPage}> </Route>
                        <Route path="/teaching" component={TeachingPage}> </Route>
                        <Route path="/projects" component={projectsPage}> </Route>
                        <Route path="/videos" component={videosPage}> </Route>
                        <Route path="/address" component={AddressPage}> </Route>

                        <Route path="/:category" component={BlogIndex}> </Route>
                        <Route path="/:category/:year/:month/:day/:title" component={BlogPage}>
                        </Route>
                    </Route>
                </Router>
            </div>
        );}
});

module.exports = { Routes }
