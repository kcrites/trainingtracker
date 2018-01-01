import React from 'react';
import './TrainingInputForm.css';



class TrainingInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sessionDate: '',
			}
		}

	onDateChange = (event) => {
		this.setState({sessionDate: event.target.value})
	}

	onSubmitDate = () => {
		const { sessionDate } = this.state;
		const { packageId, packagedate, email } = this.props;
		fetch('http://localhost:3001/addtraining', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				sessiondate: sessionDate,
				email: email,
				packageid: packageId,
				packagedate: packagedate
			})
		})
		.then(response => response.json())
		.then(userStats => {
			if(userStats){
				//this.props.loadUser(userStats);
				//this.props.onRouteChange('trainingHistory');
			}
		})
		let newSession = {
				id: this.props.sessionCount,
				sessiondate: sessionDate,
				email: email,
				packageid: packageId,
				packagedate: packagedate
		}
		this.updatePackage();
		this.props.addSession(newSession);
		this.props.onRouteChange('trainingHistory');

	
	}

	updatePackage() {
		const { packageId, email } = this.props;
			fetch('http://localhost:3001/updatepackage', {
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
				//this.props.loadUserPack(userStats);
				//this.props.onRouteChange('trainingHistory');
			}
		})
	}

	render() {
	
	return (
		<div>
			<p className='f3'>
				{'Please input your training session'}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 form center'>
					<input className='f4 pa2 w-70 center' type='date'onChange={this.onDateChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={this.onSubmitDate}>Submit</button>
				</div>
			</div>
		</div>
		);
	}
}

export default TrainingInputForm;