import React from 'react';
import './PackageInfo.css';
import DateFormat from '../DateFormat/DateFormat';

class PackageInfo extends React.Component { 
		constructor(props){
		super(props);
		this.state = {
			noPackage: false
		}
		//this.loadPackage();
		//this.getPackageHistory();
		}


 loadPackage = () => {
	const { loadUserPack, emptyPackage, email, serverURL} = this.props;
     fetch(serverURL + 'getpackage', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email
      })
    })
    .then(response => response.json())
    .then(pack => {
      if(pack.id){
        loadUserPack(pack);
        this.getHistory();
      } else {
					console.log('No Packages in the database');
					//this.setState({noPackage: true});
					emptyPackage(true);
					this.getHistory();
      }
    }).catch(err => {console.log(`loadPackage Error: ${err}`)});
	}
	
	async getPackageHistory(){
		const { email, serverURL } = this.props;
		
			const packageObj = await  fetch(serverURL + 'getpackage', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
				  email: email
				})
			  })
			  .then(response => response.json())
			  .then(pack => {
				  //(LOAD TO REDUX STORE)
				  console.log(pack);
				  this.setState({pack: pack});
			  })
		
	}
	//Get the stats and training history for the user from the DB
	async getHistory(){
		const { loaded, getStatsHistory, getTrainingHistory, historyLoaded } = this.props;
		if(!loaded) {
			let [result1, result2] = await Promise.all([getStatsHistory(), getTrainingHistory()]);
			(result1 && result2) ?
			 historyLoaded(true) 
			: console.log('getHistory async error' , result1, result2);
		}
	}

render() {
	const { completed, sessionsLeft, sessionCount, dateStarted} = this.props.pack;
	const { isTrainer, email, addPackage, trainingPackageArr } = this.props;
	const { noPackage } = this.state;
	let formattedDate;

	if(!noPackage) {
		formattedDate = DateFormat(dateStarted);
			return (
				<div >
				{(!completed ?  <div >
					<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
       				 <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Package Information</h1>
     				   <div className="pa3 bt b--black-10">
					
							<table >
								<tbody className='packtable tabletext'>
									<tr>
										<td className='tl'>Sessions Used </td><td>{sessionCount}</td>
									</tr>
									<tr>
										<td className='tl'>Sessions left </td><td>{sessionsLeft}</td>
									</tr>
									<tr>
										<td className='tl'>Package Date </td><td>{formattedDate}</td>
									</tr>
								</tbody>
							</table>
							</div></article>
							<br />
					<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
      				 <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Package Session History</h1>
       					 <div className="pa3 bt b--black-10">
							{trainingPackageArr.length > 0 ?
							<ol className='fw4 tabletext'>
							{trainingPackageArr.map(item => {
								 return <li key={item.id}>{DateFormat(item.sessiondate)}</li>
							})}
        					</ol> : <p className="fw4 tabletext">No Training Sessions Yet</p>}
						</div>
					</article>
						</div>
				: <article className="pa1 pa5-ns" data-name="slab-stat">
					<h3>You are out of sessions in your current package</h3>
					{!isTrainer ? 
						<p>Contact your trainer to set up a new training package</p> : 
						<button type='button' value={email} onClick={addPackage}>New Package</button>}
					</article>
				)}
				</div>
				);
			} else {
				return <div>No Packages</div>
			}
		}
	
	}

export default PackageInfo;