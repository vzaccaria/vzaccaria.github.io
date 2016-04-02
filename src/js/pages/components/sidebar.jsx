import React from 'react';

import _ from 'lodash'
import { statefulComponent } from './stateful'
import { SidebarBottomButton, SidebarBottom } from './sidebarBottom'
import { SidebarLinkItem, SidebarLinkList } from './sidebarLinkItem'

const debug = require('../../react-utils/debug')(__filename);



export default class Sidebar extends statefulComponent {
    render() {
        if(this.state.valid) {
            let $ = this.state.data;
            return (
                <div className="sidebar">
                    <img className="sidebar__picture" src={$.basics.picture} />
                    <div className="sidebar__name">{$.basics.name}</div>
                    <div className="sidebar__address">{$.currentWork.company}</div>
                    <SidebarLinkList>
                        <SidebarLinkItem icon='fa-home'           name= 'Home'     link="#/" />
                        <SidebarLinkItem icon='fa-flask'          name= 'Research' link="#/research" />
                        <SidebarLinkItem icon='fa-quote-left'     name= 'Blog'     link="#/blog" />
                        <SidebarLinkItem icon='fa-graduation-cap' name= 'Teaching' link="#/teaching" />
                        <SidebarLinkItem icon='fa-user'           name= 'CV'       link="https://dl.dropboxusercontent.com/u/5867765/docs/cv.pdf" />
                        <SidebarLinkItem icon='fa-youtube-play'   name= 'Videos'   link="#/videos" />
                        <SidebarLinkItem icon='fa-map-marker'     name= 'Address'  link="#/address" />
                    </SidebarLinkList>
                    <SidebarBottom>
                        {_.map($.basics.social, (it) => <SidebarBottomButton link={it.url} icon={it.icon} />)}
                    </SidebarBottom>
                </div>
            );
        } else {
            return <div />
        }
    }
}
