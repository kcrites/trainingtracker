import React from 'react';
import './packageinfo.styles.css';
import DateFormat from '../date-format/date-format';
import PackageInputForm from '../package-input/package-input.component';
import { connect } from 'react-redux';
import PackageTrainingList from './package-training-list.component';

class PackageInfo extends React.Component { 
		constructor(props){
		super(props);
		this.state = {
			history: [],
			historySet: false
		}
	}

	setHistory = () => { //When trainingList is populated add it to state and set a flag
		if(!this.state.historySet){
			this.setState({history: [...this.props.trainingList], historySet: true});
		}
	}

render() {
	const { isTrainer } = this.props.currentUser;
	const { completed, sessioncount, datestarted, maxsessions, packageid} = this.props.currentPackage;
	const { trainingList } = this.props;
	
	if(trainingList.length > 0) this.setHistory() ;
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
							{(trainingList)
							? <PackageTrainingList array={this.state.history} packageid={packageid} /> 
							: <p className="fw4 tabletext">No Training Sessions Yet</p>}
						</div>
					</article>
						</div>
				:  
					<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
					<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Package Information</h1>
					<div className="error-text-packageinfo" >No Current Package</div>
					{(isTrainer) ? <PackageInputForm /> : null}
				</article>
				)}
				</div>
				);
			} else {
				return (
					<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
						<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Package Information</h1>
						<div className="error-text-packageinfo" >No Packages</div>
						{(isTrainer) ? <PackageInputForm /> : null}
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