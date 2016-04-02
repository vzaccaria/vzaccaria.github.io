import React from 'react';

// Debug..
const debug = require('../../react-utils/debug')(__filename);

class SidebarLinkList extends React.Component {
    render() {
        return (
            <ul className="sidebar__link_list">
                {this.props.children}
            </ul>
        );
    }
}

class SidebarLinkItem extends React.Component {
    render() {
        return (
            <li className="sidebar__link_item" style={{cursor: "pointer"}} onClick={() => location.href=this.props.link}>
                <span className="sidebar__link_item__icon fa-stack">
                    <i className="fa fa-stack-2x fa-circle"/>
                    <i className={`sidebar__link_item__icon__inner fa fa-stack-1x fa-inverse ${this.props.icon}`} />
                </span>
                <div className="sidebar__link_item__name">{this.props.name}</div>
            </li>
        )
    }
}

module.exports = { SidebarLinkItem, SidebarLinkList }
