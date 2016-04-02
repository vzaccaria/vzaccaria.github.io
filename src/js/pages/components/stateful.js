import React from 'react';
let { fetchAsset } = require('../../stores/fetcher');

// Debug..
const debug = require('../../react-utils/debug')(__filename);


class statefulComponent extends React.Component {

    constructor() {
        super();
        this.state = { valid: false }
    }

    componentDidMount() {
        fetchAsset('data/cv-jr.yaml', { yaml: true }).then((data) => {
            const valid = true;
            this.setState({valid, data});
            return null;
        })
    }

}

module.exports = { statefulComponent }
