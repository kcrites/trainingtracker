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

	handleSubmitDate = () => {
		const { sessionDate } = this.state;
		//const { packagedate, email, sessionCount, serverURL } = this.props;
		//const { packageId} = this.props.pack;
	/*	fetch(serverURL + 'addtraining', {
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
		}).catch(err => {console.log(err)});
		let newSession = {
				id: sessionCount,
				sessiondate: sessionDate,
				email: email,
				packageid: packageId,
				packagedate: packagedate
		}
		this.updatePackage();
		this.props.addSession(newSession);
		this.props.onRouteChange('trainingHistory');
*/
	console.log("leavingTrainingInput");	
this.props.workoutDate(sessionDate);
this.props.onRouteChange('workout');
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
				//this.props.loadUserPack(userStats);
				//this.props.onRouteChange('trainingHistory');
			}
		}).catch(err => {console.log(err)});
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
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitDate}>Submit</button>
				</div>
			</div>
		</div>
		);
	}
}

export default TrainingInputForm;