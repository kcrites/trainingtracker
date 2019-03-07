import React from 'react';
import './TrainingInputForm.css';



class TrainingInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: this.props.email,
			trainingdate: '',
			packageId: this.props.packageId
			}
		}

	onDateChange = (event) => {
		this.setState({trainingdate: event.target.value})
	}

	onSubmitDate = () => {
		const { trainingdate, email, packageid} = this.state;
		fetch('http://localhost:3001/addtraining', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				trainingdate: trainingdate,
				email: this.state.email,
				packageid: this.state.packageid
			})
		})
		.then(response => response.json())
		.then(userStats => {
			if(userStats){
				//this.props.loadUser(userStats);
				this.props.onRouteChange('trainingHistory');
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