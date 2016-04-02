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

class SidebarBottomBuiltWith extends React.Component {
    render() {
        return (<a className="sidebar__bottom__builtwith__container" href="https://facebook.github.io/react/">
                <div className="sidebar__bottom__builtwith__text" >Built with React</div>
        </a>
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

module.exports = { SidebarBottomButton, SidebarBottom, SidebarBottomBuiltWith }
