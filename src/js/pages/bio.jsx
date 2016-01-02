import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { getTables } from 'mdtable2json';

// Debug..
const debug = require('../react-utils/debug')(__filename);


var positions = require('raw!../../../data/career.md');
positions = getTables(positions)[0].json

var education = require('raw!../../../data/education.md');
education = getTables(education)[0].json

var grants = require('raw!../../../data/grants.md');
grants = getTables(grants)[0].json

var intro = require('raw!../../../data/intro.md');

function renderPosition(p, i) {
    return (
        <div key={i} className="position">
            <div className="position__column1" >
                <div className="position__date">
                    {p.to}
                </div>
                <div className="position__date">
                    {p.from}
                </div>
            </div>
            <div className="position__column2" >
                <div className="position__name">
{p.title}
                </div>
                <div className="position__institution">
                    {p.institution}
                </div>
                <div className="position__department">
                    {p.department}
                </div>
            </div>
        </div>
    );
}

function renderDiploma(p, i) {
    return (
        <div key={i} className="diploma">
            <div className="diploma__column1" >
                <div className="diploma__name">
                    {p.name}
                </div>
                <div className="diploma__date">
                    {p.data}
                </div>
            </div>
            <div className="diploma__column2" >
                <div className="diploma__topic">
                    {p.topic}
                </div>
                <div className="diploma__institution">
                    {p.institution}
                </div>
                <div className="diploma__department">
                    {p.department}
                </div>
            </div>
        </div>
    );
}

function renderGrant(p, i) {
    return (
        <div key={i} className="grant">
            <div className="grant__column1" >
                <div className="grant__date">
                    {p.to}
                </div>
                <div className="grant__date">
                    {p.from}
                </div>
            </div>
            <div className="grant__column2" >
                <div className="grant__role">
                    {p.role}
                </div>
                <div className="grant__name">
                    {p.title}
                </div>
                <div className="grant__institution">
                    {p.institution} - {p.type}
                </div>
                <div className="grant__department">
                    {p.department}
                </div>
            </div>
        </div>
    );
}


function renderGrantBlock() {
    return (
        <div className="grants">
            <div className="grants__title"> Grants </div>
            <div className="grants-list">
                {_.map(grants, renderGrant)}
            </div>
        </div>
    );
}


function renderEducationBlock() {
    return (
        <div className="education education_size_small">
            <div className="education__title"> Education </div>
            <div className="diploma-list">
                {_.map(education, renderDiploma)}
            </div>
        </div>
    );
}


function renderCareerBlock() {
    return (
        <div className="career career_size_small">
            <div className="career__title"> Career </div>
            <div className="career-list">
                {positions.map(renderPosition)}
            </div>
        </div>
    );
}


let bioPage = React.createClass({
    render() {
        debug("Render biopage");
        return (
            <div className="bio-container">
                <div className="bio">
                    <div className="bio__title"> Bio </div>
                    <img className="bio__picture" src={require("file?name=/assets/[name].[ext]!../../img/profile_pic_1_res.jpg")}/>
                    <div className="bio-text bio-text--size-medium">
                        <div className="bio-text__title"> Vittorio Zaccaria </div>
                        <div className="bio-text__position"> Assistant Professor </div>
                        <div className="bio-text__description">
                            <ReactMarkdown source={intro} />
                        </div>
                    </div>
                </div>
                {renderGrantBlock()}
                {renderCareerBlock()}
                {renderEducationBlock()}
            </div>);
    }
});

module.exports = { bioPage }
