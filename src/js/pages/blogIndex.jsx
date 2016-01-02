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
import _ from 'lodash';
import { _b } from '../react-utils/react-bem'
import { fetchIndex } from '../stores/fetcher'

// debug..
const debug = require('../react-utils/debug')(__filename);

let filter = (list, props) => {
    return _.filter(list, (e) => e.category === props.params.category);
}

let c = _.partial(_b, 'post-preview');
let m = _.partial(_b, 'post-preview-mobile');

function renderPostTitleMobile(p, i) {
    return (
        <a key={i} href={`#${p.link}`} style={{cursor: 'pointer'}} className={m()}>
            <div className={m('description')}>
                <div className={m('title')}> {p.title} </div>
                <div className={m('small-date')}> {p.smallDate} </div>
                <div className={m('small-description')}> {p.smallDescription} </div>
            </div>
        </a>)
}


function renderPostTitle(p, i) {
    return (
        <a key={i} href={`#${p.link}`} style={{cursor: 'pointer'}} className={c()}>
            <div className={c('desc-column')}>
                <div className={c('title')}> {p.title} </div>
                <div className={c('subtitle')}>
                    <div className={c('date')}>
                        <div className={c('date-value')}> {p.formattedDate} </div>
                    </div>
                </div>
                <div className={c('description')}>
                    <div className={c('description-text')}>
                        {p.description ? p.description : 'no description'}
                    </div>
                </div>
            </div>
        </a>)

}

export default class BlogIndex extends React.Component {

    constructor() {
        super();
        this.state = { valid: false };
    }

    componentDidMount() {
        fetchIndex().then((index) => {
            let valid = true
            index = filter(index, this.props);
            this.setState({index, valid});
        });
    }

    componentWillReceiveProps(props) {
        fetchIndex().then((index) => {
            index = filter(index, props);
            this.setState({index});
        });
    }


    render() {
        if(this.state.valid) {
            return (
                <div className="posts">
                    {_.map(this.state.index, renderPostTitleMobile)}
                    {_.map(this.state.index, renderPostTitle)}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}
