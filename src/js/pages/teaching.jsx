// teaching.jsx ---

// Copyright (C) 2015 Vittorio Zaccaria <vittorio.zaccaria@gmail.com>

// Author: Vittorio Zaccaria <vittorio.zaccaria@gmail.com>

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// Except as contained in this notice, the name(s) of the above copyright
// holders shall not be used in advertising or otherwise to promote the sale,
// use or other dealings in this Software without prior written authorization.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import React from 'react';
import _ from 'lodash';
import Calendar from './components/calendar';
import Tooltip from 'rc-tooltip';

const debug = require('../react-utils/debug')(__filename);

let { tmpl, fetchAsset } = require('../stores/fetcher');

function renderContacts(contacts) {
    let c = _.map(contacts, (it, key) => {
        if(it.link) {
            return (
                <div key={key} className="contacts__detail">
                    <div className="contacts__key"> {it.key} </div>
                    <div className="contacts__value"> <a href={tmpl(it.link)}>{it.value}</a> </div>
                </div>);
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
            return x.text;
    };
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

const renderLinkText = (l) => {
    let tag = (l.tag) ? (
                <div className="lecture-links__linktag">
                    {l.tag}
                </div>) : "";
    return (
        <a href={tmpl(l.value)} >
            <div className="lecture-links__frame">
                <div className="lecture-links__linktext">
                    {l.key}
                </div>
                {tag}
            </div>
        </a>
    );
}

const renderLinkImage = (l) => {
    return (
        <div className="lecture-links__frame">
            <a href={tmpl(l.value)}>
                <img alt={l.key} className="lecture-links__img" src={l.img}> </img>
            </a>
        </div>);
}

function renderLinks(name, data) {
    const renderLink = (l) => {
        let theLink = (!_.isUndefined(l.img) ? renderLinkImage(l) : renderLinkText(l));
        return (
            <Tooltip key={l.key} placement="top" overlay={l.key}>
                {theLink}
            </Tooltip>
        );
    };
    return (
        <div className="lecture-links">
            <div className="lecture-links__title">
                {name}
            </div>
            <div className="lecture-links__list">
                {_.map(data.links, renderLink)}
            </div>
        </div>
    );
}


let renderMJ = () => {
    MathJax.Hub.Config({tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
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
            return null;
        });
    }

    componentDidUpdate() {
        renderMJ();
    }

    render() {
        if(this.state.valid) {
            return (
                <div className="teaching-page">
                    <div className="teaching-page__title">Informatica B</div>
                    <div className="teaching-page__year">Anno accademico {this.state.data.info.annoaccademico}</div>
                    {renderContacts(this.state.data.contacts)}
                    {renderMessages('Avvisi importanti', this.state.data.avvisi)}
                    {renderLinks('Tutorials e slides', this.state.data)}
                    {renderInfo("Informazioni su esame e prove in itinere", this.state.data)}
                </div>);
        } else {
            return (<div />);
        }
    }
}


/* <div className="lecture-material">
 *     <div className="lecture-material__title">
 *         Calendario e materiale
 *     </div>
 *     <div className="lecture-material__description">
 *         <p> Cliccare sui giorni evidenziati in arancione per accedere al materiale corrispondente. </p>
 *     </div>
 *     <Calendar style={{paddingBottom: '3rem'}} startMonth={"September 2016"} numberOfMonths={6} />
 * </div>*/
