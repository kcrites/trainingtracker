import React from 'react';
import { serverURL } from '../../server-path';
import { connect } from 'react-redux';

class PackageInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dateInput: '',
			packageIDInput: '',
			maxSessionsInput: null,
			allowed: false,
			success: false,
		};
	}

componentWillMount(){
	if(this.props.completed === true){
		this.setState({allowed: true});
	}
	let nextID = parseInt(this.props.packageId) + 1;
	this.setState({packageIDInput: nextID})
}
onDateChange = (event) => {
	this.setState({dateInput: event.target.value})
}
onMSessionsChange = (event) => {
	this.setState({maxSessionsInput: parseInt(event.target.value)})
}

onPackIDChange = (event) => {
	this.setState({packageIDInput: event.target.value})
}

handleTrainerSubmit = (e) => {
	
	const { newPackage } = this.props;
	const { email } = this.props.currentUser
	const { dateInput, maxSessionsInput, packageIDInput } = this.state;
    fetch(serverURL + 'addpackage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				packagedate: dateInput,
				maxsessions: maxSessionsInput,
				packageid: packageIDInput,
				new: newPackage,
			})
		})
		.then(response => response.json())
		.then(newpack => {
			if(newpack.id){
				//reload page showing status of insert to DB
				this.setState({success: true});
				
			}
		}).catch(err => {console.log(err)});
	};

render() {
const { displayName } = this.props.currentUser;
const { allowed, packageIDInput, success } = this.state;

	if(success){
		return <div>Success adding new package</div>
	} else {
		return (
			!allowed ? <div>Current Package is not yet completed</div>
			: <div>
				<p className='f3'>
					{`Please input the new training package for ${displayName}`}
				</p>
				<div className='center'>
					<div className='pa4 br2 shadow-5 center'>
						<table>
							<tbody>
								<tr>
									<td className='tl'><label>Date</label></td>
									<td><input className='f4 pa2 w-80 center' name='date' type='date'onChange={this.onDateChange}/></td>
								</tr>
								<tr>
									<td className='tl'><label>Package ID</label></td>
									<td><input className='f4 pa2 w-50 center' name='packageid' value={packageIDInput} type='text'  onChange={this.onPackIDChange} /></td>
								</tr>
								<tr>
									<td className='tl'><label>Number of Sessions</label></td>
									<td><input className='f4 pa2 w-50 center' name='maxsessions' type='number'  onChange={this.onMSessionsChange} /></td>
								</tr>
								<tr>
									<td colSpan='2'><button className='w-50 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={this.handleTrainerSubmit}>Submit</button></td>
								</tr>
							</tbody>
					</table>
					</div>
				</div>
			</div>	
			);
		}
	}	
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(PackageInputForm);
