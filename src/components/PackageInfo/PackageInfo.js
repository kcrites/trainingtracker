import React from 'react';
import './PackageInfo.css';
import DateFormat from '../DateFormat/DateFormat';
import { connect } from 'react-redux';

class PackageInfo extends React.Component { 
		constructor(props){
		super(props);
		this.state = {
			history: []
		}
	}
componentDidMount(){

}


render() {
	const { isTrainer, email } = this.props.currentUser;
	const { completed, sessioncount, datestarted, maxsessions, packageid} = this.props.currentPackage;
	const { trainingList } = this.props;
	const { addPackage } = this.props;
	
	const sessionsLeft = (maxsessions) ? maxsessions - sessioncount : 0;
	
	let formattedDate;

	if(packageid) {
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
							{trainingList.reverse().map(item => {
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
				return (
					<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
						<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Package Information</h1>
						<div className="pa3 bt b--black-10" >No Packages</div>
					</article>
					)
			}
		}
	
	}

const mapStateToProps = state => ({
		currentUser: state.user.currentUser,
		currentPackage: state.pack.currentPackage,
		trainingList: state.training.trainingList,
		currentClient: state.client.currentClient
	});

export default connect(mapStateToProps)(PackageInfo);