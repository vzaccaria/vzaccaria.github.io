// research.jsx ---

// Copyright (C) 2015 Vittorio Zaccaria <vittorio.zaccaria@gmail.com>

// Author: Vittorio Zaccaria <vittorio.zaccaria@gmail.com>

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// Except as contained in this notice, the name(s) of the above copyright
// holders shall not be used in advertising or otherwise to promote the sale,
// use or other dealings in this Software without prior written authorization.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import React from 'react';

import _ from 'lodash'
import { _bem } from '../react-utils/react-bem'
import { tmpl } from '../stores/fetcher'

// Debug..
const debug = require('../react-utils/debug')(__filename);


var projectsData = require('../../../data/projects.json');



let projectsPage = React.createClass({

    renderProject(p, k) {
        let bem= _.partial(_bem, 'project');
        let handler = () => {
            window.location.href = p.link
            }
        return (
            <div key={k} {...bem()} style={{cursor: 'pointer'}} onClick={handler}>
                <img {...bem('image')} src={`${tmpl(p.image)}`} />
                <div {...bem('name')}> {p.name} </div>
                <div {...bem('description')}> {p.description} </div>
            </div>);
        },
    render() {
        let bem= _.partial(_bem, 'projects-page');
        return (
            <div {...bem()} >
                <div {...bem('title')} > Projects </div>
                <div {...bem('project-list')}>
                    {_.map(projectsData, this.renderProject)}
                     </div>
            </div>);
    }

});




module.exports = { projectsPage }
