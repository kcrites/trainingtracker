import React from 'react';
import { serverURL } from '../../server-path';
import { connect } from 'react-redux';
import { addPackage } from '../../redux/package/package.actions';

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
	if(this.props.currentPackage.completed === true){
		this.setState({allowed: true});
	}
	let nextID = parseInt(this.props.currentPackage.packageId) + 1;
	this.setState({packageIDInput: nextID})
}

handleDateChange = (event) => {
	this.setState({dateInput: event.target.value})
}
handleMaxSessionsChange = (event) => {
	this.setState({maxSessionsInput: parseInt(event.target.value)})
}

handlePackIDChange = (event) => {
	this.setState({packageIDInput: event.target.value})
}

handleTrainerSubmit = (e) => {
	
	let newPackage = false;
	const { email } = this.props.currentUser
	const { packageid } = this.props.currentPackage;
	const { dateInput, maxSessionsInput, packageIDInput } = this.state;
	if(!packageid) newPackage = true;
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
				this.props.addPackage(newpack);
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
									<td><input className='f4 pa2 w-80 center' name='date' type='date'onChange={this.handleDateChange}/></td>
								</tr>
								<tr>
									<td className='tl'><label>Package ID</label></td>
									<td><input className='f4 pa2 w-50 center' name='packageid' value={packageIDInput} type='text'  onChange={this.handlePackIDChange} /></td>
								</tr>
								<tr>
									<td className='tl'><label>Number of Sessions</label></td>
									<td><input className='f4 pa2 w-50 center' name='maxsessions' type='number'  onChange={this.handleMaxSessionsChange} /></td>
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
	currentUser: state.user.currentUser,
	currentPackage: state.pack.currentPackage
});

const mapDispatchToProps = dispatch => ({
	addPackage: pack => dispatch(addPackage(pack))
})

export default connect(mapStateToProps, mapDispatchToProps)(PackageInputForm);
