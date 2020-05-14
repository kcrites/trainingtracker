import React from 'react';
import './trainer-details.styles.scss';

const TrainerDetails = (props) => (
    <div>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="trainer-name">Name: {props.trainerObject.name}</label>
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="trainer-number">Mobile: {props.trainerObject.phone}</label>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="link">Website: <a className='web-link' href={props.trainerObject.web}>here</a></label>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="link">Email: {props.trainerObject.email}</label>
        </div>
    </div>
);

export default TrainerDetails;