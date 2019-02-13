
import React from 'react';


const renderRow= (array) =>{
  
  return array.map((item, index)  => 
            <tr className="stripe-dark">
            <td className="pa3">{index+1}</td>
              <td className="pa3">{item.date}</td>
              <td className="pa3">{item.weight}</td>
              <td className="pa3">{item.muscleMass}</td>
              <td className="pa3">{item.fatLevel}</td>
              <td className="pa3">{item.bmi}</td>
              <td className="pa3">{item.vv}</td>
              <td className="pa3">{item.percentWater}</td>
            </tr>

    );
}

const  Stats = ({statHistory}) => {
  if(!statHistory[0]) {
    return("Your history is empty");
  } else{

	return (

      <div className="pa4">
        <div className="overflow-auto center">
          <table className="f6 w-100 mw8 " cellSpacing="0">
            <thead>
              <tr className="stripe-dark">
                <th className="fw6 tl pa3 bg-white">Number</th>
                <th className="fw6 tl pa3 bg-white">Date</th>
                <th className="fw6 tl pa3 bg-white">Weight</th>
                <th className="fw6 tl pa3 bg-white">Muscle Mass</th>
                <th className="fw6 tl pa3 bg-white">Fat Level</th>
                <th className="fw6 tl pa3 bg-white">BMI</th>
                <th className="fw6 tl pa3 bg-white">Fat Level Organs</th>
                  <th className="fw6 tl pa3 bg-white">% Body Water</th>
              </tr>
            </thead>
            <tbody className="lh-copy">
              {renderRow(statHistory)}

            </tbody>
          </table>
        </div>
      </div>
      );
    }
}

export default Stats;