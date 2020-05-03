import React from 'react';
import { serverURL } from '../../server-path';
import { connect } from 'react-redux';
import { setClient } from '../../redux/client/client.actions';
//import { RenderRowTrainer } from '../render-row/render-row.component';


const renderRow= (array, action) =>{
  return array.map((item, index)  => 
            <tr key={index} className="stripe-dark">
            	<td className="pa3">{index+1}</td>
	            <td className="pa3">{item.fname}</td>
	            <td className="pa3">{item.packageid}</td>
	            <td className="pa3">{item.sessioncount}</td>
	            <td className="pa3">{item.maxsessions-item.sessioncount}</td>
	            <td className="pa3">{item.email}</td>
              <td className="pa3"><button type='button' value={item.email} onClick={action}>Select</button></td>
            </tr>
    );
}

let clientListArr = [];

class Trainer extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        loaded: false,
        loading: false,
        trainerId: 'Desire'
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
  const { trainerId } = this.state;
  
    if(clientListArr.length === 0) {
      fetch(serverURL + 'getclients', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          trainer: trainerId
        })
      })
      .then(response => response.json())
      .then(list => {
        if(list){
          list.forEach(e => {clientListArr.push(e)});
        }
      })
      .then(() => {
        this.setState({loaded: true});
          })
      .catch(err => {console.log(err)});
    } else {  //The array is already loaded 
      this.setState({loaded: true});
    }
  } 

 handleTrainerSubmit = (e) => {
    fetch(serverURL + 'trainergetclient', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: e.target.value,
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
			//	console.log(user);
        this.props.setClient(user);
        this.props.onRouteChange('home');
			} else return false;
        }).catch(err => {
			console.log(err);
			return false;
		});
        return true;
  };



  render() {
    const {loaded} = this.state;
    const {handleTrainerSubmit} = this;
    if(clientListArr.length === 0) {
      return("Your Client List is empty");
    } else{
        return (
          <div>
            <div className="pa4">
            <p>Trainer Dashboard: Client List</p>
              <div className="overflow-auto center">
              {loaded === null && <p>Loading ...</p>}
              { loaded && (
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
                    </tr>
                  </thead>
                  <tbody className="lh-copy">
                    {(loaded) ? 
                  renderRow(clientListArr, handleTrainerSubmit)
                  : null}
                  </tbody>
              </table> )}
              </div>  
            </div>
          </div>
        );
      }
    }
  }

  const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    client: state.client.currentClient
  });

  const mapDispatchToState = dispatch => ({
    setClient: user => dispatch(setClient(user))
  });

  export default connect(mapStateToProps, mapDispatchToState)(Trainer);