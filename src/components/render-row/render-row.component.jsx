import React from 'react';
import ArrowImage from './ArrowImage';

//from training
const fixDate = (array, dates) => {
  
      array.map((item) => {
        if(dates === 1){ //Measurements History
            let d = new Date(item.statsdate );
            item.statsdate = d.toLocaleDateString();
        } else {  //Training History
            let d1 = new Date(item.sessiondate);
            item.sessiondate = d1.toLocaleDateString();
            let d2 = new Date(item.packagedate);
            item.packagedate = d2.toLocaleDateString();
        }
      return array;
  })
  
}

export const RenderRowTrainer = ({array, action}) => {

  return array.map((item, index)  => 
  <tr key={index} className="stripe-dark">
    <td className="history-cell">{index+1}</td>
    <td className="history-cell">{item.fname}</td>
    <td className="history-cell">{item.packageid}</td>
    <td className="history-cell">{item.sessioncount}</td>
    <td className="history-cell">{item.maxsessions-item.sessioncount}</td>
    <td className="history-cell">{item.email}</td>
    <td className="history-cell"><button type='button' value={item.email} onClick={action}>Select</button></td>
  </tr>
);
} //From Trainer.js

export const RenderRowTraining = ({array, action}) =>{
   fixDate(array, 2);
    return array.map((item, index)  => 
              <tr key={index} className="stripe-dark">
              <td className="history-cell">{index+1}</td>
                <td className="history-cell">{item.sessiondate}</td>
                {item.packageid !== 0 ?  <td className="history-cell">{item.packagedate}</td> : <td className='history-cell'>None</td>}
                <td className="history-cell"><button type='button' value={index} onClick={action}>Delete</button></td>
              </tr>
      );
} // From history.component.jsx (Training)

export const RenderRowMeasurements = ({array}) =>{
  fixDate(array,1);

  const indicator = [];
  for(let k = 0; k < array.length-1; k++){
    indicator.push(statIndicator(array, k));
  }
  return array.map((item, index)  => 
            <tr key={index} className="stripe-dark">
            <td className="history-cell">{index+1}</td>
              <td className="history-cell">{item.statsdate}</td>
              <td className="history-cell">{item.weight} {(index < array.length-1  )? indicator[index][0] : ''}</td>
              <td className="history-cell">{item.musclemass} {(index< array.length-1  )? indicator[index][1] : ''}</td>
              <td className="history-cell">{item.fatlevel} {(index < array.length-1  )? indicator[index][2]: ''}</td>
              <td className="history-cell">{item.bmi} {(index < array.length-1  )? indicator[index][3]: ''}</td>
              <td className="history-cell">{item.vv} {(index < array.length-1  )? indicator[index][4]: ''}</td>
              <td className="history-cell">{item.percentwater} {(index < array.length-1  )? indicator[index][5] : ''}</td>
            </tr>
    );
} // From history.component.jsx (Measurements)

export const RenderColumn = ({array}) => {
    return array.map((item, index) => 
    <th key={index} className="fw6 tl bg-white history-header">{item}</th>
    );
} // From history.component.jsx (Both)


// Provides images to indicate if the current stats are more, less, or equal to the previous 
// measurements. This is called when the user is logging in so that the indicators are stored in state.
export const statIndicator = (array, index) => {
   let results = [];

    if(array.length < 2) return false;
      results[0] = checkStats(array[index].weight, array[index+1].weight, false);
      results[1] = checkStats(array[index].musclemass, array[index+1].musclemass, true);
      results[2] = checkStats(array[index].fatlevel, array[index+1].fatlevel, false);
      results[3] = checkStats(array[index].bmi, array[index+1].bmi, false);
      results[4] = checkStats(array[index].vv, array[index+1].vv, false);
      results[5] = checkStats(array[index].percentwater, array[index+1].percentwater, true);

      return results;
}

// Logic to determine if current stat is more, less or equal to the previous stat
export const checkStats = (newStat, lastStat, arrowMeaning) => {
  newStat = parseFloat(newStat);
  lastStat = parseFloat(lastStat);

  if(newStat > lastStat) {
    //"up";
    return arrowMeaning ? <ArrowImage arrow="upgreen"/> : <ArrowImage arrow="upred"/>
  } else if(newStat === lastStat){
    //'equal';
    return <ArrowImage arrow="equal"/> 
  } else if(newStat < lastStat){
    // "down";
    return arrowMeaning ? <ArrowImage arrow="downred"/>  : <ArrowImage arrow="downgreen"/>
  } else return " ";
}