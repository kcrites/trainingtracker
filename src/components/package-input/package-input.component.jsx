import React from 'react';
import { serverURL } from '../../server-path';
import { connect } from 'react-redux';
import { addPackage } from '../../redux/package/package.actions';
import { withRouter } from 'react-router-dom';
import './package-input.styles.scss';

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
	if(this.props.currentPackage.completed === true || !this.props.currentPackage.packageid){
		this.setState({allowed: true});
	}
	let nextID = 0;

	if(!this.props.currentPackage.packageid){
		nextID = 100;
	} else {
		nextID = parseInt(this.props.currentPackage.packageid) + 1;
	}
	this.setState({packageIDInput: nextID})
}

componentDidMount(){
	if(!this.props.currentUser) {
        this.props.history.push('/signin');
     }
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

handleTrainerSubmit = async (e) => {
	
	let newPackage = false;
	const { email } = this.props.currentClient;
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


const { allowed, packageIDInput, success } = this.state;

	if(success){
		return <div>Success adding new package</div>
	} else {
		return (
			!allowed ? <div>Current Package is not yet completed</div>
			: <div>
				

        <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">Add New Package for {this.props.currentClient.fname}</h1>
				
				<div className='center'>
					<div className='pa4 br2 shadow-5 center'>
						<table>
							<tbody>
								<tr>
									<td className='package-input-text'><label>Date</label></td>
									<td><input className='f4 pa2 w-90 center' name='date' type='date' onChange={this.handleDateChange}/></td>
								</tr>
								<tr>
									<td className='package-input-text'><label>Package ID</label></td>
									<td><input className='f4 pa2 w-50 center' name='packageid' value={packageIDInput} type='text' onChange={this.handlePackIDChange} /></td>
								</tr>
								<tr>
									<td className='package-input-text'><label># of Sessions</label></td>
									<td><input className='f4 pa2 w-50 center' name='maxsessions' type='number' onChange={this.handleMaxSessionsChange} /></td>
								</tr>
								<tr>
									<td colSpan='2'><div className='package-input-form'><button className='grow f4 link ph3 pv2 dib white bg-light-blue package-input-button-td' onClick={this.handleTrainerSubmit}>Submit</button></div></td>
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
	currentPackage: state.pack.currentPackage,
	currentClient: state.client.currentClient
});

const mapDispatchToProps = dispatch => ({
	addPackage: pack => dispatch(addPackage(pack))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackageInputForm));
