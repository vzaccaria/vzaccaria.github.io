import React from 'react';
import _ from 'lodash';

import { _b } from '../../react-utils/react-bem'

// Debug..
const debug = require('../../react-utils/debug')(__filename);


var Publication = React.createClass({

    render() {

        let b = _.partial(_b, 'publication');
        let h = _.partial(_b, 'publication__href');

        let renderAuthor = (a, i) => {
                if(a.name  === 'V. Zaccaria') {
                    return <div key={i} className={b('authors__myname')}>{a.name}</div>
                } else {
                    return <div key={i} className={b('authors__name')}>{a.name}</div>
                }
        };

        return (
            <div className={b()}>
                <div className={b('title')}>{this.props.data.title}</div>
                <div className={b('authors')}>
                    {_.map(this.props.data.author, renderAuthor)}
                </div>
                <div className={b('info')}>
                    <div className={b('category', this.props.data.displayAs)}>
                        {this.props.data.type}
                    </div>
                    <div className={b('name')}>
                        {this.props.data.smartbooktitle}
                    </div>
                    <div className={b('date')}>
                        {this.props.data.month} {this.props.data.year}
                    </div>
                    <div className={b('pages')}>
                        {this.props.data.pages}
                    </div>
                    <div className={h()}>
                        <div className={h('doi')}>
                            <i className={h('doi__icon-dl')} >
                            </i>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = { Publication }
