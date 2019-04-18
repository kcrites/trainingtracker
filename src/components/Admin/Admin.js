import React from 'react';

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
              <td className="pa3"><button>Select</button></td>
            </tr>
    );
}

let clientListArr = [];

class Admin extends React.Component {

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
  //this.setState(Object.assign({loading: true}));
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
      })
      .then(() => {
        this.setState({loading: true});
        console.log(this.state.loading);
          })
      .catch(err => {console.log(err)});
    } else {  //The array is already loaded 
      this.setState({loading: true});
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
              {this.state.loading === null && <p>Loading ...</p>}
              { this.state.loading && (
                <table className="f6 w-75 mw8 " cellSpacing="0">
                  <thead>
                    <tr className="stripe-dark">
                      <th className="fw6 tl pa3 bg-white">Number</th>
                      <th className="fw6 tl pa3 bg-white">User</th>
                      <th className="fw6 tl pa3 bg-white ">Package ID</th>
                      <th className="fw6 tl pa3 bg-white">Sessions Used</th>
                      <th className="fw6 tl pa3 bg-white">Sessions Left</th>
                      <th className="fw6 tl pa3 bg-white">Email</th>
                      <th className="fw6 tl pa3 bg-white">Select</th>
                    </tr>
                  </thead>
                  <tbody className="lh-copy">
                  {renderRow(clientListArr)}
                  </tbody>
              </table> )}
              </div>  
            </div>
          </div>
        );
      }
    }
  }

  export default Admin;