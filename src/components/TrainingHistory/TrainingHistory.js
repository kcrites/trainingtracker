
import React from 'react';

// needs a for loop to only display rows when there is enough data. Should only show sessions for this package.

const renderRow= (array) =>{
  
  return array.map((item, index)  => 
            <tr className="stripe-dark">
            <td className="pa3">{index+1}</td>
              <td className="pa3">{item.sessionDate}</td>
              <td className="pa3">{item.packageId}</td>
            </tr>

    );
}

const  TrainingHistory = ({history}) => {

if(!history[0]) {
  return("Your history is empty");
} else{

    return (

    <div className="pa4">
    <p>Training History</p>
      <div className="overflow-auto center">
        <table className="f6 w-75 mw8 " cellSpacing="0">
          <thead>
            <tr className="stripe-dark">
            <th className="fw6 tl pa3 bg-white center">Number</th>
              <th className="fw6 tl pa3 bg-white center">Date</th>
              <th className="fw6 tl pa3 bg-white center">Package ID</th>
            </tr>
          </thead>
          <tbody className="lh-copy">
          {renderRow(history)}

          </tbody>
        </table>
      </div>
    </div>
    );
  }
}

export default TrainingHistory;