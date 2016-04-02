import React from 'react';
import { statefulComponent } from './components/stateful'
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { getTables } from 'mdtable2json';
let { tmpl, fetchAsset } = require('../stores/fetcher');
let $m = require('moment')

// Debug..
const debug = require('../react-utils/debug')(__filename);



//     - { from: '2015-07-10' , to: '2016-07-10' , role: principal investigator , type: grant from industrial partner , institution:  STMicroelectronics , project:  Strumenti di Progettazione e Verifica per Circuiti Crit

                    //{(!_.isUndefined(p.to)) ? $m(p.to).format('YYYY') : 'Now'}
function renderPosition(p, i) {
    let position = p.positionLong ? p.positionLong : p.position
    return (
        <div key={i} className="position">
            <div className="position__column1" >
                <div className="position__date">
                   {p.endDate ? $m(p.endDate).format("YYYY") : 'now'}
                </div>
                <div className="position__date">
                    {$m(p.startDate).format("YYYY")}
                </div>
            </div>
            <div className="position__column2" >
                <div className="position__name">
                    {position}
                </div>
                <div className="position__institution">
                    {p.company}
                </div>
                <div className="position__department">
                    - {p.address}
                </div>
            </div>
        </div>
    );
}

function renderDiploma(p, i) {
    console.log(p)
    return (
        <div key={i} className="diploma">
            <div className="diploma__column1" >
                <div className="diploma__name">
                    {p.studyType}
                </div>
                <div className="diploma__date">
                    {$m(p.endDate).format("YYYY")}
                </div>
            </div>
            <div className="diploma__column2" >
                <div className="diploma__topic">
                    {p.area}
                </div>
                <div className="diploma__institution">
                    {p.institution}
                </div>
                <div className="diploma__department">
                    - {p.department}
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
                    {$m(p.to).format("YYYY")}
                </div>
                <div className="grant__date">
                    {$m(p.from).format("YYYY")}
                </div>
            </div>
            <div className="grant__column2" >
                <div className="grant__role">
                    {p.role}
                </div>
                <div className="grant__name">
                    {p.project}
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


function renderGrantBlock($) {
    const grants = _.filter($.research.grants, (g) => g.highlight);
    return (
        <div className="grants">
            <div className="grants__title"> Grants </div>
            <div className="grants-list">
                {_.map(grants, renderGrant)}
            </div>
        </div>
    );
}


function renderEducationBlock($) {
    return (
        <div className="education education_size_small">
            <div className="education__title"> Education </div>
            <div className="diploma-list">
                {_.map($.education, renderDiploma)}
            </div>
        </div>
    );
}


function renderCareerBlock($) {
    let workSorted = _.sortBy($.work, (x) => -1 * $m(x.startDate).unix());
    return (
        <div className="career career_size_small">
            <div className="career__title"> Career </div>
            <div className="career-list">
                {workSorted.map(renderPosition)}
            </div>
        </div>
    );
}


class bioPage extends statefulComponent {

    render() {
        if(this.state.valid) {
            const $ = this.state.data
            return (
                <div className="bio-container">
                    <div className="bio">
                        <div className="bio__title"> Bio </div>
                        <img className="bio__picture" src={require("file?name=assets/[name].[ext]!../../img/profile_pic_1_res.jpg")}/>
                        <div className="bio-text bio-text--size-medium">
                            <div className="bio-text__title">{$.basics.name}</div>
                            <div className="bio-text__position">{$.basics.label}</div>
                            <div className="bio-text__description">
                                <ReactMarkdown source={$.basics.websiteSummary} />
                            </div>
                        </div>
                    </div>
                    {renderGrantBlock($)}
                    {renderCareerBlock($)}
                    {renderEducationBlock($)}
                </div>);
        } else {
            return <div></div>;
        }
    }
}

module.exports = { bioPage }
