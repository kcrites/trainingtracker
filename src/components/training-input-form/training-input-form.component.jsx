import React from 'react';
import { connect } from 'react-redux';
import './training-input-form.styles.scss';
import { serverURL } from '../../server-path';
import { addPackage } from '../../redux/package/package.actions';
import { addTraining } from '../../redux/training/training.actions';
import { withRouter } from 'react-router-dom';

class TrainingInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sessionDate: '',
			selfTraining: false,
			type: 'training'
			}
		}

	handleDateChange = (event) => {
		this.setState({sessionDate: event.target.value})
	}

	handleSelfChange = event => {
		this.setState({selfTraining: event.target.checked});
	}

	handleSubmitDate = async (event) => {
		event.preventDefault();
		const { sessionDate, selfTraining } = this.state;

		const { datestarted, packageid} = this.props.currentPackage;
		let pId, pDate, pYear, pMonth, pDay, formattedDate;

		if(!packageid && !selfTraining){
			alert("No Package available, please select Self-Training");
			return;
		}

		if(selfTraining){
			pDate = null;
			pId = 0;
		} else{
			//Format the date so that it comes in correctly with regards to Timezone
			pDate = new Date(datestarted);
			pYear = pDate.getFullYear();
			pMonth = pDate.getMonth() + 1;
			pDay = pDate.getDate();
			pId = parseInt(packageid);
			formattedDate = `${pYear}-${pMonth}-${pDay}`
		}

		let id = -1; 

		fetch(serverURL + 'addtraining', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				sessiondate: sessionDate,
				email: this.props.activeEmail,
				packageid: pId,
				packagedate: formattedDate
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.id){
				id = data.id;		
					let newSession = {
						id: id,
						sessiondate: sessionDate,
						email: this.props.activeEmail,
						packageid: pId,
						packagedate: pDate
					}
			if(!selfTraining){
				this.updatePackage();
			}
			this.props.addTraining(newSession);
			this.props.history.push('/traininghistory');
			}
		}).catch(err => {console.log(err)});
	}

	updatePackage() {
		const { packageid } = this.props.currentPackage;
			fetch(serverURL + 'updatepackage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.props.activeEmail,
				packageid: packageid,
			})
		})
		.then(response => response.json())
		.then(packUpdate => {
			if(packUpdate){
				this.props.addPackage(packUpdate);
			}
		}).catch(err => {console.log(err)});
	}

handleTypeSelect = (event) => {
	this.setState({type: event.target.value})
}

	render() {
	
	return (
		<nav className='center' style={{display: 'flex', justifyContent: '',gridArea:'header'}}>
			<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
				<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Add a Training Session</h1>
				<div className="pa3 bt b--black-10">	
					<div className='pa1 br2 shadow-5 training-form center'>
						<input className='f5 pa1 w-70 center' type='date'onChange={this.handleDateChange}/>
						<button name='session' className='w-30 grow f5 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitDate}>Submit</button>
					</div>
					<span className='f7'>Self-training</span>{" "}<input type='checkbox' onChange={this.handleSelfChange} name='selfTraining'/>{" "}
					<span className="f7">Training Type  </span><select className="f7" name="type" id="type" onChange={this.handleTypeSelect}>
															<option value="training">Training</option>
															<option value="run">Run</option>
															<option value="indoorcycle">Indoor Cycle</option>
															<option value="outdoorcycle">Outdoor Cycle</option>
															<option value="football">Football</option>
															<option value="other">Other</option>
															</select>
				</div>
			</article>
		</nav>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentPackage: state.pack.currentPackage,
	currentClient: state.client.currentClient,
	activeEmail: state.indicator.activeEmail
});

const mapDispatchToProps = dispatch => ({
	addPackage: pack => dispatch(addPackage(pack)),
    addTraining: train => dispatch(addTraining(train))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainingInputForm));