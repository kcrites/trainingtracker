import React from 'react';

const Groups = (props) => {

    let groupID = 'gexercise' + props.number;

return (
    <select name={groupID} onChange={props.handleFunction}>
    <option value="group0">0</option>
    <option value="group1">1</option>
    <option value="group2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    </select>
    )
};

export default Groups;
