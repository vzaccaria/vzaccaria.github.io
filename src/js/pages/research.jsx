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
import ReactMarkdown from 'react-markdown';
import { getTables } from 'mdtable2json';
import { Publication } from './components/publication.jsx'

import { processData } from '../react-utils/normalize-pubs'
let { tmpl, fetchAsset } = require('../stores/fetcher');

import { _b } from '../react-utils/react-bem'

// Debug..
const debug = require('../react-utils/debug')(__filename);

var biblioJson = _.map(require('../../../data/bibliov2.json').records, processData);
biblioJson = _.sortBy(biblioJson, (x) => x.timestamp * (-1));

class researchPage extends React.Component {

    constructor() {
        super();
        this.state = { valid: false }
    }

    componentDidMount() {
        fetchAsset('data/cv-jr.yaml', { yaml: true }).then((data) => {
            const valid = true;
            this.setState({valid, data});
            return null;
        })
    }

    render() {

        let p = _.partial(_b, 'publications');
        let s = _.partial(_b, 'statement');

        if(this.state.valid) {
            let research_achievements = _.flatten(_.pluck(this.state.data.work, 'highlights'));
            research_achievements = _.map(research_achievements, (r) => `* ${r}`).join('\n');
            return (
                <div className={p()}>

                    <div className={s()}>
                        <div className={s('title')}>
                            Current research
                        </div>
                        <div className={s('summary')}>
                            <ReactMarkdown source={this.state.data.research.currentGoals.short}> </ReactMarkdown>
                        </div>
                    </div>

                    <div className={s()}>
                        <div className={s('title')}>
                            Past research and achievements
                        </div>
                        <div className={s('summary')}>
                            <ReactMarkdown source={research_achievements}>
                            </ReactMarkdown>
                        </div>
                    </div>

                    <div className={p('header')}>
                        Publications
                    </div>
                    <div className={p('container')}> {_.map(biblioJson, (it, k) => {return (<Publication data={it} key={k}> </Publication>);})} </div>
                </div>
            );
        } else {
            return <div />
        }
    }
}


module.exports = { researchPage }
