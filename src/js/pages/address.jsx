import React from 'react';
import _ from 'lodash';

import { _bem } from '../react-utils/react-bem'
import MapThis from './components/mapthis'

const debug = require('../react-utils/debug')(__filename);

let { tmpl, fetchAsset } = require('../stores/fetcher');

function renderContacts(contacts) {
    let c = _.map(contacts, (it, key) => {
        if(it.link) {
            return (
                <div key={key} className="contacts__detail">
                    <div className="contacts__key"> {it.key} </div>
                    <div className="contacts__value"> <a href={tmpl(it.link)}>{it.value}</a> </div>
                </div>)
        } else {
            return (
                <div key={key} className="contacts__detail">
                    <div className="contacts__key"> {it.key} </div>
                    <div className="contacts__value"> {it.value} </div>
                </div>);
        }
    });
    return (
        <div className="contacts">
            {c}
        </div>);
}

function renderMessages(name, messages) {
    let _content = (x) => {
        if(x.link)
            return <a href={tmpl(x.link)}> {x.text} </a>;
        else
            return x.text
    }
    function renderMessage(it, key) {
        return (
            <div key={key} className='lecture-messages__message'>
                <div className='lecture-messages__date'>
                    {it.title}
                </div>
                <div className='lecture-messages__text'>
                    {_content(it)}
                </div>
            </div>
        );
    }
    return (
        <div className="lecture-messages">
            <div className="lecture-messages__title">
                {name}
            </div>
            <div className="lecture-messages__message">
                {_.map(messages, renderMessage)}
            </div>
        </div>);
}

function renderTemi(temi) {
    function renderTema(it, key) {
        return (
            <li key={key}>
                <a href={it.value}> {it.key} </a>
            </li>
        );
    }
    return (
        <ul> {_.map(temi, renderTema)} </ul>
    );
}

function renderInfo(name, data) {
    return (
        <div className="lecture-messages">
            <div className="lecture-messages__title">
                {name}
            </div>
            <div className="lecture-messages__message">
                <div className="lecture-messages__date">Raccolta temi d'esame</div>
                <div className="lecture-messages__text">{renderTemi(data.temi)}</div>
            </div>
        </div>);
}

export default class Teaching extends React.Component {

    constructor() {
        super();
        this.state = { valid: false };
    }

    componentDidMount() {
        fetchAsset('data/infob.yaml', { yaml: true }).then((dta) => {
            let valid = true;
            let data = dta;
            this.setState({valid, data});
        })
    }

    renderContacts(address) {
        let bem = _.partial(_bem, 'contacts');
        let renderKeyValue = (e, k) => {
            return (
                <div key={k} {...bem('detail')}>
                    <div {...bem('key')}> {e.key} </div>
                    <div {...bem('value')}> {e.value} </div>
                </div>);
            }
        return (
            <div {...bem()} > {_.map(address,renderKeyValue)} </div>
            );
        }

    render() {
        if(this.state.valid) {
            return (
                <div className="bio-container">
                    <div className="address">
                        <div className="address__title"> Address </div>
                        {renderContacts(this.state.data.address)}
                    <MapThis className="address__map" lat={45.478828} long={9.232421} />
                    </div>
                </div>)
        } else {
            return (<div />);
        }
    }
}
