import React from 'react';
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
    return array.map((item, index)  => 
              <tr key={index} className="stripe-dark">
              <td className="pa3">{index+1}</td>
                <td className="pa3">{item.sessiondate}</td>
                {item.packageid !== 0 ?  <td className="pa3">{item.packagedate}</td> : <td>None</td>}
              </tr>
            
      );
}

export const RenderRowMeasurements = ({array, indicator}) =>{
  fixDate(array,1);
  let i = 0;//array.length-1;
return array.map((item, index)  => 
          <tr key={index} className="stripe-dark">
          <td className="pa3">{index+1}</td>
            <td className="pa3">{item.statsdate}</td>
            <td className="pa3">{item.weight} {(index === i )? indicator.weight : ''}</td>
            <td className="pa3">{item.musclemass} {(index === i )? indicator.musclemass : ''}</td>
            <td className="pa3">{item.fatlevel} {(index === i )? indicator.fatlevel: ''}</td>
            <td className="pa3">{item.bmi} {(index === i )? indicator.bmi: ''}</td>
            <td className="pa3">{item.vv} {(index === i )? indicator.vv: ''}</td>
            <td className="pa3">{item.percentwater} {(index === i )? indicator.percentwater : ''}</td>
          </tr>
  );
}

export const RenderColumn = ({array}) => {
    return array.map((item, index) => 
    <th key={index} className="fw6 tl pa3 bg-white">{item}</th>
    );
}