import React from 'react';
import _ from 'lodash';
import uid from 'uid';

// Debug..
const debug = require('../../react-utils/debug')(__filename);

var $script = require("scriptjs");

export default class MapThis extends React.Component {

    constructor() {
        super();
        this.state = { id: `id-${uid()}` }
    }

    componentDidMount() {
        $script("https://maps.googleapis.com/maps/api/js", () => {
            let	map_canvas = document.getElementById(this.state.id);
            let center = new google.maps.LatLng(this.props.lat, this.props.long);
            let map_options = {
                center: center,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map      = new google.maps.Map(map_canvas, map_options);
            let marker   = new google.maps.Marker({position: center, map: map, title: 'Vittorio Zaccaria\'s Office'});
            google.maps.event.addListener(marker, 'click', ()	=> {
                window.location.href = 'https://www.google.com/maps/place/Via+Ponzio,+34,+Politecnico+di+Milano+-+Campus+Leonardo'
            })
        })
    }

    render() {
        return (<div id={this.state.id} {...this.props} />);
    }
}
