
import React from 'react';

// needs a for loop to only display rows when there is enough data. Should only show sessions for this package.



const fixDate = (array) => {
      array.map((item) => {
      let d1 = new Date(item.sessiondate);
      let d2 = new Date(item.packagedate);
      item.sessiondate = d1.toLocaleDateString();
      item.packagedate = d2.toLocaleDateString();
      return array;
  })
}

const renderRow= (array) =>{

   fixDate(array);
  
    return array.map((item, index)  => 
              <tr key={index} className="stripe-dark">
              <td className="pa3">{index+1}</td>
                <td className="pa3">{item.sessiondate}</td>
                <td className="pa3">{item.packagedate}</td>
              </tr>

      );
}

class TrainingHistory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: []
    };
   
  }

//
componentWillMount(){
 // if(trainingHistoryArr.length < 1) {
 // this.getHistory();
 // console.log('WillMount called');
//}
}

/*//
  loadHistory = (data) => {
    this.setState({
      history: { this.props.trainingHistoryArr }
    }, () => {console.log('loadHistory in traininghistory.js');})
    
  }*/

//
/*getHistory = () => {
  // trainingHistoryArr = [];
  // console.log('getHistory function');
    fetch('http://localhost:3001/gettrainings', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.email,
        packageid: this.props.packageId
      })
    })
    .then(response => response.json())
    .then(train => {
      if(train){
        train.forEach(e => {trainingHistoryArr.push(e)});
      }
    })
    .then(this.loadHistory(trainingHistoryArr))
    .catch(err => {console.log(err)});
   // console.log('end of getHistory');
  }*/

  render(){
   // console.log('start of render',trainingHistoryArr[0]);

    if(this.props.trainingHistoryArr.length === 0) {
      return("Your history is empty");
    } else{

        return (

        <div className="pa4">
        <p>Training History</p>
          <div className="overflow-auto center">
            <table className="f6 w-75 mw8 " cellSpacing="0">
              <thead>
                <tr className="stripe-dark">
                <th className="fw6 tl pa3 bg-white">Number</th>
                  <th className="fw6 tl pa3 bg-white">Date</th>
                  <th className="fw6 tl pa3 bg-white">Package Date</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
              {renderRow(this.props.trainingHistoryArr)}

              </tbody>
            </table>
          </div>
        </div>
        );
    }
  }
}

export default TrainingHistory;