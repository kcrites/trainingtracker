import React from 'react';
import './TrainingInputForm.css';

class TrainingInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sessionDate: '',
			selfTraining: false
		
			}
		}

	handleDateChange = (event) => {
		this.setState({sessionDate: event.target.value})
	}

	handleSelfChange = event => {
		this.setState({selfTraining: event.target.checked});
	}

	handleSubmitDate = (event) => {
		const { sessionDate } = this.state;
		const {  onRouteChange } = this.props;
		const { packagedate, email, serverURL } = this.props;
		const { packageId} = this.props.pack;
		let pId, pDate;

		if(this.state.selfTraining){
			pDate = null;
			pId = 0;
		} else{
			pDate = packagedate;
			pId = parseInt(packageId);
		}
		let id = -1;
		fetch(serverURL + 'addtraining', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				sessiondate: sessionDate,
				email: email,
				packageid: pId,
				packagedate: pDate
			})
		})
		.then(response => response.json())
		.then(data => {
			
			if(data.id){
			//	this.props.loadUser(data);
			
			id = data.id;
				console.log(`data.id: ${data.id}, ${id}`)
				let newSession = {
					id: id,
					sessiondate: sessionDate,
					email: email,
					packageid: pId,
					packagedate: pDate
			}
			if(!this.state.selfTraining){
				this.updatePackage();
			}
			this.props.addSession(newSession, this.state.selfTraining);
			//this.props.getTrainingHistory();
			onRouteChange('trainingHistory');
			}
		}).catch(err => {console.log(err)});

		
	}

	updatePackage() {
		const {  email, serverURL } = this.props;
		const { packageId } = this.props.pack;
			fetch(serverURL + 'updatepackage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				packageid: packageId,
			})
		})
		.then(response => response.json())
		.then(userStats => {
			if(userStats){
				this.props.loadUserPack(userStats);
				//this.props.onRouteChange('trainingHistory');
			}
		}).catch(err => {console.log(err)});
	}

	render() {
	
	return (
		<nav className='center' style={{display: 'flex', justifyContent: 'center',gridArea:'header'}}>
			
		{/* 	<div className='f3'>
				{'Add a training session'}
				<div className='pa1 br2 shadow-5 form center'>
					<input className='f5 pa1 w-70 center' type='date'onChange={this.onDateChange}/>
					<button name='session' className='w-30 grow f5 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitDate}>Submit</button>
				</div>
				
				</div>	 */}
		<article className=" mw5 mw6-ns br3 hidden ba b--black-10 mv1">
        	<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Add a Training Session</h1>
        	<div className="pa3 bt b--black-10">	
				<div className='pa1 br2 shadow-5 form center'>
					<input className='f5 pa1 w-70 center' type='date'onChange={this.handleDateChange}/>
					<button name='session' className='w-30 grow f5 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitDate}>Submit</button>
				</div>
				<span className='f7'>Self-training</span>{" "}<input type='checkbox' onChange={this.handleSelfChange} name='selfTraining'/>
			</div>
		</article>
		</nav>
		);
	}
}

export default TrainingInputForm;