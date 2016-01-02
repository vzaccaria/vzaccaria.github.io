import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { fetchIndex } from '../../stores/fetcher'
import Tooltip from 'rc-tooltip';

import '../../../css/tooltip.css';


// Debug..
const debug = require('../../react-utils/debug')(__filename);



/* Uniform date constructor for comparisons */
let _d = (d) => d.format('DD-MM-YYYY');


export default class Calendar extends React.Component {

    constructor() {
        super();
        this.state = { valid: false }
    }

    componentDidMount() {
        fetchIndex().then((index) => {
            let valid = true;
            let data = _.indexBy(index, (it) => {
                // can create a moment from an ISO date (xmlschema)
                return _d(moment(it.date))
            });
            let today = moment()
                this.setState({ valid, data, today });
        })
    }

    getStartMonth() {
        let format = _.get(this.props, "format", "MMMM YYYY");
        let startMonth = _.get(this.props, "startMonth", "September 2015");
        return moment(startMonth, format)
    }

    getNumberOfMonths() {
        let numberOfMonths = parseInt(_.get(this.props, "numberOfMonths", 3));
        return numberOfMonths;
    }

    renderMonth(month, index) {
        return (
            <div key={index} className='calendar__month'>
                <div className='calendar__month_name'> {month.format('MMMM')} </div>
                {this.renderDaysInMonth(month)}
            </div>);
    }

    getPost(day) {
        let dta = this.state.data[_d(day.dateMoment)]
        if(!_.isUndefined(dta)) {
            day.title = dta.title;
            day.tags = dta.tags;
            day.link = dta.link;
            day.classes = [`calendar__category_${dta.category}`]
            day.style = {cursor: 'pointer'}
        }
        return day
    }

    renderDay(day) {
        let classes = [ 'calendar__day' ];
        let number = 'NA'
        let style = {}

        if(!day.notInMonth) {
            day = this.getPost(day);
            style = day.style;

            classes = classes.concat(day.classes);

            if(_d(day.dateMoment) === _d(this.state.today)) {
                classes = classes.concat('calendar__day_is_today');
            }
            if(day.dateMoment.day() == 0 || day.dateMoment.day() == 6) {
                classes = classes.concat('calendar__day_not_working');
            } else {
                classes = classes.concat('calendar__day_working');
            }
        } else {
            classes = classes.concat('calendar__day_not_in_month');
        }

        function gotoDay(d) {
            return function() {
                if(d.link) {
                    window.location.href = `#${d.link}`;
                }
            }
        }

        if(day.dateMoment) {
            number = day.dateMoment.date();
        }

        if(day.title) {
            return (
            <Tooltip key={day.index} placement="top" overlay={day.title}>
                <div style={style} className={classes.join(' ')} onClick={gotoDay(day)}>
                    {number}
                </div>
            </Tooltip>)
        } else {
            return (
                <div key={day.index} style={style} className={classes.join(' ')} onClick={gotoDay(day)}>
                    {number}
                </div>);
        }
    }

    /* cm is the moment corresponding to the beginning of the month */
    renderDaysInMonth(cm) {
        let days = _.range(0, cm.daysInMonth());
        let daysMup = []
        let isSunday = (cd) => cd.day() == 0;

        if(!isSunday(cm)) {
            daysMup = _.map(_.range(0, cm.day()), (v, index) => {
                let notInMonth = true;
                index = `${index}-n`
                return this.renderDay({ notInMonth, index });
            })
        }

        return daysMup.concat(
            _.map(days, (d, index) => {
                let dateMoment = moment(cm).add(d, 'days');
                let notInMonth = false;
                return this.renderDay({ dateMoment, notInMonth, index})
            }));
    }

    render() {
        if(this.state.valid) {
            let months = _.range(0, this.getNumberOfMonths());
            let renderedMonths = _.map(months, (it, index) => {
                return this.renderMonth(this.getStartMonth().add(it, "months"), index);
            });
            return (
                <div style={this.props.style} className="calendar">
                    {renderedMonths}
                </div>
            );
        } else {
            return <div></div>
        }
    }
}
