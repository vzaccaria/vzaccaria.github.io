import React from "react";

let _ = require("lodash");
let { statefulComponent } = require("./stateful").default;

let {
  SidebarBottomButton,
  SidebarBottom,
  SidebarBottomBuiltWith
} = require("./sidebarBottom").default;
let { SidebarLinkItem, SidebarLinkList } = require("./sidebarLinkItem").default;

export default class Sidebar extends statefulComponent {
  render() {
    if (this.state.valid) {
      let $ = this.state.data;
      return (
        <div className="sidebar">
          <img
            className="sidebar__picture"
            src={require("../../../img/avatar-vz.jpg")}
          />
          <div className="sidebar__name">{$.basics.name}</div>
          <div className="sidebar__address">{$.currentWork.company}</div>
          <SidebarLinkList>
            <SidebarLinkItem icon="fa-home" name="Home" link="#/" />
            <SidebarLinkItem
              icon="fa-flask"
              name="Research"
              link="#/research"
            />
            <SidebarLinkItem icon="fa-quote-left" name="Blog" link="#/blog" />
            <SidebarLinkItem
              icon="fa-bullhorn"
              name="Teaching"
              link="deposit/course.html"
            />
            <SidebarLinkItem
              icon="fa-graduation-cap"
              name="Stages/Thesis"
              link="#/thesis"
            />
            <SidebarLinkItem
              icon="fa-user"
              name="CV"
              link="https://www.dropbox.com/s/gh4x3viv3qvqzpg/cv.pdf?dl=0"
            />
            <SidebarLinkItem
              icon="fa-youtube-play"
              name="Videos"
              link="#/videos"
            />
            <SidebarLinkItem
              icon="fa-map-marker"
              name="Address"
              link="#/address"
            />
          </SidebarLinkList>
          <SidebarBottom>
            <SidebarBottomBuiltWith />
            {_.map($.basics.social, it => (
              <SidebarBottomButton link={it.url} icon={it.icon} key={it.url} />
            ))}
          </SidebarBottom>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
