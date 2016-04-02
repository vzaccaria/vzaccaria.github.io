import React from 'react';

// Debug..
const debug = require('../../react-utils/debug')(__filename);

class SidebarBottomButton extends React.Component {
    render() {
        return (
            <div className="sidebar__bottom__button" onClick={() => location.href = this.props.link} style={{cursor: "pointer"}} >
                <i className={`fa ${this.props.icon}`} />
            </div>
            );
        }
}

class SidebarBottom extends React.Component {
    render() {
        return (
            <div className="sidebar__bottom">
                {this.props.children}
            </div>
        )
    }
}

module.exports = { SidebarBottomButton, SidebarBottom }
