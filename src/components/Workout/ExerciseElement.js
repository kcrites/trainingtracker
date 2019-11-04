import React from 'react';
import Groups from './Groups';

const ExerciseElement = (props) => {

    const { number, groupArray } = props;
    let exerciseNumber = 'exercise' + number;

return (
    <tr key={number.toString()}>
        <td><label>Exercise {number}</label></td>
        <td><input className='f4 pa2 w-250 center' name={exerciseNumber} type='text' onChange={props.handleEFunction} /></td>
        <td key={number}><Groups number={number} groupArray={groupArray} handleFunction={props.handleGFunction}/></td>
    </tr>
    )
};

export default ExerciseElement;
