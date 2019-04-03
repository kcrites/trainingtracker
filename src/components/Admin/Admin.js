import React from 'react';
import boat from '../Navigation/boat.png';


// needs a for loop to only display rows when there is enough data. Should only show sessions for this package.

const renderRow= (array) =>{
  
  return array.map((item, index)  => 
            <tr key={index} className="stripe-dark">
            	<td className="pa3">{index+1}</td>
	            <td className="pa3">{item.name}</td>
	            <td className="pa3">{item.packageid}</td>
	            <td className="pa3">{item.sessioncount}</td>
	            <td className="pa3">{item.maxsessions-item.sessioncount}</td>
	            <td className="pa3">{item.email}</td>
            </tr>

    );
}
let clientListArr = [];


class Admin extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        loading: false
      }
    }
     
componentWillMount() {
  this.getClients();
}

getClients = () => {
  
  this.setState(Object.assign({loading: true}));
  console.log(this.state.loading);
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
        console.log(`list: ${list.length}`)
        if(list){
          list.forEach(e => {clientListArr.push(e)});
        }
      }).then(() => {
        this.setState({loading: false});
        console.log(this.state.loading);
          })
    }
  } 

  render() {
    if(clientListArr.length === 0) {
      return("Your Client List is empty");
    } else{
        return (
          <div>
            <div className="pa4">
            <p>Administration: Client Information</p>
              <div className="overflow-auto center">
                <table className="f6 w-75 mw8 " cellSpacing="0">
                  <thead>
                    <tr className="stripe-dark">
                      <th className="fw6 tl pa3 bg-white">Number</th>
                      <th className="fw6 tl pa3 bg-white">User</th>
                      <th className="fw6 tl pa3 bg-white ">Package ID</th>
                      <th className="fw6 tl pa3 bg-white">Sessions Used</th>
                      <th className="fw6 tl pa3 bg-white">Sessions Left</th>
                      <th className="fw6 tl pa3 bg-white">Email</th>
                    </tr>
                  </thead>
                  <tbody className="lh-copy">
                  {renderRow(clientListArr)}
                  </tbody>
                </table>
              </div>  
            </div>
          </div>
        );
      }
    }
  }

  export default Admin;