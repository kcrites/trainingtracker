import React from 'react';
//import DateFormat from '../DateFormat/DateFormat';
import './PackageInfo.css';

class PackageInfo extends React.Component { 
		constructor(props){
		super(props);
		this.loadPackage();
		}

loadPackage = () => {
    fetch('http://localhost:3001/getpackage', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.email
      })
    })
    .then(response => response.json())
    .then(pack => {
      if(pack.id){
        console.log('packid: ', pack.packageid)
        this.props.loadUserPack(pack);
        this.getHistory();
      } else {
					console.log('Empty package information');
					//need to load completed to true
					this.getHistory();
      }
    }).catch(err => {console.log(err)});
	}
	
	//Get the stats and training history for the user from the DB
	async getHistory(){
		const { loaded } = this.props;
		if(!loaded) {
			let [result1, result2] = await Promise.all([this.props.getStatsHistory(), this.props.getTrainingHistory()]);
			(result1 && result2) ?
			this.props.historyLoaded(true) 
			: console.log('getHistory async error' , result1, result2);
		}
	}

render() {
	const {completed, sessionsLeft, sessionCount, dateStarted} = this.props.pack;
	return (
		<div>
		{(!completed ?  <div >
			<p className="sidetitle">Package Information</p>
					 <table width="50%">
						<tbody className='packtable'>
							<tr>
								<td >Sessions Used: </td><td>{sessionCount}</td>
							</tr>
							<tr>
								<td >Sessions left: </td><td>{sessionsLeft}</td>
							</tr>
							<tr>
								<td>Package Date: </td><td>{dateStarted}</td>
							</tr>
						</tbody>
					</table>
				</div>
		: <article className="pa1 pa5-ns" data-name="slab-stat">
			<h3>You are out of sessions in your current package</h3>
			<p>Contact your trainer to set up a new training package</p>
			<button type='button' value={this.props.email} onClick={this.props.addPackage}>New Package</button>
		  </article>
		)}
		</div>
		);
		}
	}

export default PackageInfo;