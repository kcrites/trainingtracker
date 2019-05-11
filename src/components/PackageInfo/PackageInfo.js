import React from 'react';
import './PackageInfo.css';
import DateFormat from '../DateFormat/DateFormat';

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
	const { completed, sessionsLeft, sessionCount, dateStarted} = this.props.pack;
	const { isTrainer } = this.props;
	console.log('datestarted' + dateStarted);
	let formattedDate;
	if(dateStarted !== undefined) {formattedDate = DateFormat(dateStarted);}
	return (
		<div>
		{(!completed ?  <div >
			<p className="sidetitle">Package Information</p>
					 <table width="60%">
						<tbody className='packtable'>
							<tr>
								<td className='tl'>Sessions Used: </td><td>{sessionCount}</td>
							</tr>
							<tr>
								<td className='tl'>Sessions left: </td><td>{sessionsLeft}</td>
							</tr>
							<tr>
								<td className='tl'>Package Date: </td><td>{formattedDate}</td>
							</tr>
						</tbody>
					</table>
				</div>
		: <article className="pa1 pa5-ns" data-name="slab-stat">
			<h3>You are out of sessions in your current package</h3>
			{!isTrainer ? 
				<p>Contact your trainer to set up a new training package</p> : 
				<button type='button' value={this.props.email} onClick={this.props.addPackage}>New Package</button>}
		  </article>
		)}
		</div>
		);
		}
	}

export default PackageInfo;