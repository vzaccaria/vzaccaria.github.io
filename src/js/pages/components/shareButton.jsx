import React from 'react';
import _ from 'lodash';

// Debug..
const debug = require('../../react-utils/debug')(__filename);

export default class ShareButton extends React.Component {

    render() {
        let social = _.get(this.props, "social", "twitter");
        let handler = () => {};
        if(social === "twitter") {
            let thisurl = encodeURIComponent(window.location.href);
            let via = encodeURIComponent('_vzaccaria_');
            let text = encodeURIComponent('Hei! Check out this link: ');
            handler = () => {
                window.location = `https://twitter.com/share?url=${thisurl}&via=${via}&text=${text}$`
            }
        } else {
            if(social === "reddit") {
                let thisurl = encodeURIComponent(window.location.href);
                let title   = encodeURIComponent(document.title);
                handler = () => {
                    window.location = `http://www.reddit.com/submit?url=${thisurl}&title=${title}`
                }
            } else {
                if(social === "github") {
                    let { origLink } = this.props;
                    handler = () => {
                        window.location = origLink
                    }
                }
            }
        }
        let className = `share_buttons__share_${social}`;
        let iconName = `fa fa-${social}`
        return (
            <div className={className} style={{"cursor": "pointer"}} onClick={handler}>
                <i className={iconName} />
            </div>);
    }
}
