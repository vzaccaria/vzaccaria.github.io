import React from 'react';

import _ from 'lodash'
import { _bem } from '../react-utils/react-bem'
import ReactMarkdown from 'react-markdown';

// Debug..
const debug = require('../react-utils/debug')(__filename);


var videosData = require('../../../data/videos.json');



let videosPage = React.createClass({

    renderVideo(p, k) {
        let bem= _.partial(_bem, 'video');
        return (
            <div key={k} {...bem()} style={{cursor: 'pointer'}} >
                <iframe {...bem('iframe')} src={p.link} />
                <div {...bem('data')}>
                    <div {...bem('title')}> {p.title} </div>
                    <div {...bem('recorded-on')}> {p.recordedOn} </div>
                    <div {...bem('description')}>
                        <ReactMarkdown source={p.description} />
                    </div>
                </div>
            </div>);
    },
    render() {
        let bem= _.partial(_bem, 'videos-page');
        return (
            <div {...bem()} >
                <div {...bem('title')} > Institutional videos </div>
                <div {...bem('video-list')}>
                    {_.map(videosData, this.renderVideo)}
                </div>
            </div>);
    }

});


module.exports = { videosPage }
