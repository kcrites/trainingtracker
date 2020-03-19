import React from 'react';
import './TrainingCard.css';
import DateFormat from './components/DateFormat/DateFormat';
//show only the training sessions from the current package, or last 10 if no package

export const TrainingCard = props => (
    <div className='card-list'>
        <h2>Package Status</h2>
        <h3>Package Date {props.package.packagedate}</h3>
        {props.pack.sessionCount} Sessions Left {props.pack.sessionsLeft}
        <ol>
            {props.package.map(item => {
                let formattedDate = DateFormat(item.sessiondate);
                return <li>{formattedDate}</li>
            })}
        </ol>

    </div>
);