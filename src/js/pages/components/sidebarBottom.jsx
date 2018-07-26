import React from "react";

class SidebarBottomButton extends React.Component {
  render() {
    return (
      <div
        className="sidebar__bottom__button"
        onClick={() => (location.href = this.props.link)}
        style={{ cursor: "pointer" }}
      >
        <i className={`fa ${this.props.icon}`} />
      </div>
    );
  }
}

class SidebarBottomBuiltWith extends React.Component {
  render() {
    return (
      <div className="sidebar__bottom__builtwith__container">
        <a
          className="sidebar__bottom__builtwith__text"
          href="https://facebook.github.io/react/"
        >
            Built with React
        </a>
        <div className="sidebar__bottom__builtwith__text__date">
          on {__BUILDDATE__}
        </div>
      </div>
    );
  }
}

class SidebarBottom extends React.Component {
  render() {
    return <div className="sidebar__bottom">{this.props.children}</div>;
  }
}

export default { SidebarBottomButton, SidebarBottom, SidebarBottomBuiltWith };
