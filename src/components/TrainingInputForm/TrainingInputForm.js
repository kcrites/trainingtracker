import React from 'react';
import { connect } from 'react-redux';
import './TrainingInputForm.css';
import { serverURL } from '../../server-path';
import { addPackage } from '../../redux/package/package.actions';
import { addTraining } from '../../redux/training/training.actions';

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
		const { email } = this.props.currentUser;
		const {  onRouteChange } = this.props;
		const { datestarted, packageid} = this.props.currentPackage;
		//const { packageId} = this.props.pack;
		let pId, pDate;

		if(this.state.selfTraining){
			pDate = null;
			pId = 0;
		} else{
			pDate = datestarted;
			pId = parseInt(packageid);
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
			this.props.addTraining(newSession);
		
			onRouteChange('trainingHistory');
			}
		}).catch(err => {console.log(err)});

		
	}

	updatePackage() {
		
		const { email } = this.props.currentUser;
		const { packageid } = this.props.currentPackage;
			fetch(serverURL + 'updatepackage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				packageid: packageid,
			})
		})
		.then(response => response.json())
		.then(userStats => {
			if(userStats){
			//	this.props.loadUserPack(userStats);
			this.props.addPackage(userStats);
				
			}
		}).catch(err => {console.log(err)});
	}

	render() {
	
	return (
		<nav className='center' style={{display: 'flex', justifyContent: 'center',gridArea:'header'}}>
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

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentPackage: state.pack.currentPackage
});

const mapDispatchToProps = dispatch => ({
	addPackage: pack => dispatch(addPackage(pack)),
    addTraining: train => dispatch(addTraining(train))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingInputForm);