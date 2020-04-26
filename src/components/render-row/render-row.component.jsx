import React from 'react';
import ArrowImage from '../Stats/ArrowImage';

//from training
const fixDate = (array, dates) => {
      array.map((item) => {
        if(dates === 1){
            let d = new Date(item.statsdate);
            item.statsdate = d.toLocaleDateString();
        } else {
            let d1 = new Date(item.sessiondate);
            item.sessiondate = d1.toLocaleDateString();
            let d2 = new Date(item.packagedate);
            item.packagedate = d2.toLocaleDateString();
        }
      return array;
  })
}

export const RenderRowTraining = ({array}) =>{
   fixDate(array, 2);
   console.table(array);
    return array.map((item, index)  => 
              <tr key={index} className="stripe-dark">
              <td className="pa3">{index+1}</td>
                <td className="pa3">{item.sessiondate}</td>
                {item.packageid !== 0 ?  <td className="pa3">{item.packagedate}</td> : <td>None</td>}
              </tr>
      );
}

export const RenderRowMeasurements = ({array}) =>{
  fixDate(array,1);
  //***** check for ematpy or single element array *******
  const indicator = [];
  for(let k = 0; k < array.length-1; k++){
    indicator.push(statIndicator(array, k));
  }
  console.table(indicator);
  let i = 0;//array.length-1;
return array.map((item, index)  => 
          <tr key={index} className="stripe-dark">
          <td className="pa3">{index+1}</td>
            <td className="pa3">{item.statsdate}</td>
            <td className="pa3">{item.weight} {(index < array.length-1  )? indicator[index][0] : ''}</td>
            <td className="pa3">{item.musclemass} {(index< array.length-1  )? indicator[index][1] : ''}</td>
            <td className="pa3">{item.fatlevel} {(index < array.length-1  )? indicator[index][2]: ''}</td>
            <td className="pa3">{item.bmi} {(index < array.length-1  )? indicator[index][3]: ''}</td>
            <td className="pa3">{item.vv} {(index < array.length-1  )? indicator[index][4]: ''}</td>
            <td className="pa3">{item.percentwater} {(index < array.length-1  )? indicator[index][5] : ''}</td>
          </tr>
  );
}

export const RenderColumn = ({array}) => {
    return array.map((item, index) => 
    <th key={index} className="fw6 tl pa3 bg-white">{item}</th>
    );
}


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