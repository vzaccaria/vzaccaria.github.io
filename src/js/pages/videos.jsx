import React from 'react';
import { statefulComponent } from './components/stateful'
import _ from 'lodash'
import { _bem } from '../react-utils/react-bem'
import ReactMarkdown from 'react-markdown';
let { fetchAsset } = require('../stores/fetcher');

// Debug..
const debug = require('../react-utils/debug')(__filename);





class videosPage extends statefulComponent {

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
    }

    render() {
        if(this.state.valid) {
        let bem= _.partial(_bem, 'videos-page');
        return (
            <div {...bem()} >
                <div {...bem('title')} > Institutional videos </div>
                <div {...bem('video-list')}>
                    {_.map(this.state.data.research.videos, this.renderVideo)}
                </div>
            </div>);
        } else {
            return <div />
            }
    }

}


module.exports = { videosPage }
