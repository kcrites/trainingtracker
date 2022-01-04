import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './cal.styles.scss';



 class Cal extends React.Component {
    state = {
        dateObject: moment()
    };
    constructor(props) {
        super(props);
    }

    weekdayshort = moment.weekdaysShort();
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    }
    weekdayshortname = this.weekdayshort.map(day => {
        return(
            <th key={day} className="week-day">
                {day}
            </th>
        );
    });
    
    firstDayOfMonth = () => {
        let dateObject = this.dateObject;
        let firstDay = moment(dateObject)
                .startOf("month")
                .format("d");
        return firstDay;
    }

    

	
    render(){
        let blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            );
        }
        let daysInMonths = [];
        for(let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonths.push(
                <td key={d} className="calendar-day">
                    {d}
                </td>
            );
        }
        var totalSlots = [...blanks, ...daysInMonths];
        let rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if(i % 7 !== 0) {
                cells.push(row);
            }else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if(i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });
        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>
        })

    return(
		<div>
            <table>
                <thead>
                {this.weekdayshortname}
                </thead>
               <tbody>
                   {daysinmonth}
               </tbody>
            </table>
        </div>
        );
	}};

const mapStateToProps = state => ({
		currentUser: state.user.currentUser
	});
export default withRouter(connect(mapStateToProps)(Cal));
