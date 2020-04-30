import React from 'react';
import './PackageInfo.css';
import DateFormat from '../DateFormat/DateFormat';
import { connect } from 'react-redux';
//import { serverURL } from '../../server-path';
//import { getPackageSessions } from '../packages/packages.utils';

class PackageInfo extends React.Component { 
		constructor(props){
		super(props);
		this.state = {
			noPackage: false,
			history: []
		}
	//	this.loadPackage();
		//this.getPackageHistory();
		}
componentDidMount(){
	
}

/* 	getData = async () => {
		console.log('starting getData from packageinfo')
        const result1 = await getPackageSessions(this.props.trainingList, this.props.currentPackage.packageid, this.storeInState)
 
        if(result1){
			console.log('ending getData from packageinfo')
        }
	}
	
	storeInState = (data) => {
		this.setState({history: data})
	} */

/*  loadPackage = () => {
	const { loadUserPack, emptyPackage} = this.props;
	const { email } = this.props.currentUser;
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
	} */
	
/* 	async getPackageHistory(){
	
		const { email } = this.props.currentUser;
		
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
		
	} */
	//Get the stats and training history for the user from the DB
/* 	async getHistory(){
		const { loaded, getStatsHistory, getTrainingHistory, historyLoaded} = this.props;
		if(!loaded) {
			let [result1, result2] = await Promise.all([getStatsHistory(), getTrainingHistory()]);
			(result1 && result2) ?
			 historyLoaded(true) 
			: console.log('getHistory async error' , result1, result2);
		}
	} */

render() {
	const { isTrainer, email } = this.props.currentUser;
	const { completed, sessioncount, datestarted, maxsessions, packageid} = this.props.currentPackage;
	const { trainingList } = this.props;
	const { addPackage } = this.props;
	const { noPackage } = this.state;
	const sessionsLeft = (maxsessions) ? maxsessions - sessioncount : 0;
	console.log('packageinfo redner');
	let formattedDate;

	if(!noPackage) {
		formattedDate = DateFormat(datestarted);
			return (
				<div >
				{(!completed ?  <div >
					<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
       				 <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Package Information</h1>
     				   <div className="pa3 bt b--black-10">
					
							<table >
								<tbody className='packtable tabletext'>
									<tr>
										<td className='tl'>Sessions Used </td><td>{sessioncount}</td>
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
							{(trainingList)?
							<ol className='fw4 tabletext'>
							{trainingList.map(item => {
								if(item.packageid === parseInt(packageid))
								 return <li key={item.id}>{DateFormat(item.sessiondate)}</li>
								 else return null;
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

const mapStateToProps = state => ({
		currentUser: state.user.currentUser,
		currentPackage: state.pack.currentPackage,
		trainingList: state.training.trainingList
	});

export default connect(mapStateToProps)(PackageInfo);