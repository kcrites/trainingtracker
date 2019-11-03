import React from 'react';

const Groups = (props) => {
    const { groupArray, number } = props;
    let groupID = 'gexercise' + number;

return (
    <select name={groupID} value={groupArray[number-1]} onChange={props.handleFunction}>
    <option value="group0">-</option>
    <option value="group1">1</option>
    <option value="group2">2</option>
    <option value="group3">3</option>
    <option value="group4">4</option>
    <option value="group5">5</option>
    <option value="group6">6</option>
    <option value="group7">7</option>
    <option value="group8">8</option>
    <option value="group9">9</option>
    <option value="group10">10</option>
    </select>
    )
};

export default Groups;
