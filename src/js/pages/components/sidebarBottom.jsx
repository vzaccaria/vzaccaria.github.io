import React from 'react';

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
                <div className="sidebar__bottom__builtwith__text" >on {__BUILDDATE__}</div>
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

export default { SidebarBottomButton, SidebarBottom, SidebarBottomBuiltWith }
