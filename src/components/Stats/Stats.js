
import React from 'react';


const fixDate = (array) => {
      array.map((item) => {
      let d = new Date(item.statsdate);
      item.statsdate = d.toLocaleDateString();
      return array;
  })
}

const renderRow= (array) =>{

    fixDate(array);
  
  return array.map((item, index)  => 
            <tr key={index} className="stripe-dark">
            <td className="pa3">{index+1}</td>
              <td className="pa3">{item.statsdate}</td>
              <td className="pa3">{item.weight}</td>
              <td className="pa3">{item.musclemass}</td>
              <td className="pa3">{item.fatlevel}</td>
              <td className="pa3">{item.bmi}</td>
              <td className="pa3">{item.vv}</td>
              <td className="pa3">{item.percentwater}</td>
            </tr>

    );
}


class Stats extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: []
    };
   
  }

componentWillMount(){
}

render() {
  const {statHistory} = this.props;
  if(statHistory.length === 0) {
    return("Your history is empty");
  } else{

	return (

      <div className="pa4"><p>Stats History</p>
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
}

export default Stats;