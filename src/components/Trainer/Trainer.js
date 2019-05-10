import React from 'react';

// needs a for loop to only display rows when there is enough data. Should only show sessions for this package.

const renderRow= (array, action, action2) =>{
  return array.map((item, index)  => 
            <tr key={index} className="stripe-dark">
            	<td className="pa3">{index+1}</td>
	            <td className="pa3">{item.fname}</td>
	            <td className="pa3">{item.packageid}</td>
	            <td className="pa3">{item.sessioncount}</td>
	            <td className="pa3">{item.maxsessions-item.sessioncount}</td>
	            <td className="pa3">{item.email}</td>
              <td className="pa3"><button type='button' value={item.email} onClick={action}>Select</button></td>
              <td className="pa3"><button type='button' value={item.email} onClick={action2}>Package</button></td>
            </tr>
    );
}

let clientListArr = [];

class Trainer extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        loading: null
      }
    }
     
componentDidMount() {
  this.getClients();
}
componentWillUnmount() {
  clientListArr = [];

  console.log("admin: willUnmount");
}

getClients = () => {
  console.log('trainer loading: ' + this.state.loading);
    if(clientListArr.length === 0) {
      fetch('http://localhost:3001/getclients', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          trainer: 'Desire'
        })
      })
      .then(response => response.json())
      .then(list => {
        console.log(`client list: ${list.length}`)
        if(list){
          list.forEach(e => {clientListArr.push(e)});
        }
      })
      .then(() => {
        this.setState({loading: true});
        console.log(`loading state: ${this.state.loading}`);
          })
      .catch(err => {console.log(err)});
    } else {  //The array is already loaded 
      this.setState({loading: true});
    }
  } 

  render() {
    const {loading} = this.state;
    const {onTrainerSubmit, addPackage} = this.props;
    if(clientListArr.length === 0) {
      return("Your Client List is empty");
    } else{
        return (
          <div>
            <div className="pa4">
            <p>Trainer Dashboard: Client List</p>
              <div className="overflow-auto center">
              {loading === null && <p>Loading ...</p>}
              { loading && (
                <table className="f6 w-75 mw8 " cellSpacing="0">
                  <thead>
                    <tr className="stripe-dark">
                      <th className="fw6 tl pa3 bg-white">Number</th>
                      <th className="fw6 tl pa3 bg-white">User</th>
                      <th className="fw6 tl pa3 bg-white">Package ID</th>
                      <th className="fw6 tl pa3 bg-white">Sessions Used</th>
                      <th className="fw6 tl pa3 bg-white">Sessions Left</th>
                      <th className="fw6 tl pa3 bg-white">Email</th>
                      <th className="fw6 tl pa3 bg-white">Select</th>
                      <th className="fw6 tl pa3 bg-white">Package</th>
                    </tr>
                  </thead>
                  <tbody className="lh-copy">
                  {renderRow(clientListArr, onTrainerSubmit, addPackage)}
                  </tbody>
              </table> )}
              </div>  
            </div>
          </div>
        );
      }
    }
  }

  export default Trainer;