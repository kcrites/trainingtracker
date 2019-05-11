import React from 'react';

const onTrainerSubmit = (e) => {
    console.log('package submit'+ e.target.value );
   /* fetch('http://localhost:3001/addpackage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: e.target.value,
				date: e.target.date,
				maxsessions: e.target.maxsessions,
				packageid: e.target.packageid,
			})
		})
		.then(response => response.json())
		.then(newpack => {
			if(newpack.id){
				//reload page showing status of insert to DB
			}
		}).catch(err => {console.log(err)});
		*/
	};


class PackageInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dateInput: '',
			packageIDInput: '',
			maxSessionsInput: null,
			allowed: false,
		};
	}

componentWillMount(){
	if(this.props.completed === true){
		this.setState({allowed: true});
	}
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
render() {
const { fName } = this.props;
const { allowed } = this.state;
	return (
		!allowed ? <div>Current Package is not yet completed</div>
		: <div>
			<p className='f3'>
				{`Please input the new training package for ${fName}`}
			</p>
			<div className='center'>
				<div className='pa4 br2 shadow-5 center'>
					<table>
						<tbody>
							<tr>
								<td><label>Date</label></td>
								<td><input className='f4 pa2 w-80 center' name='date' type='date'onChange={this.onDateChange}/></td>
							</tr>
							<tr>
								<td><label>Package ID</label></td>
								<td><input className='f4 pa2 w-50 center' name='packageid' type='text'  onChange={this.onPackIDChange} /></td>
							</tr>
							<tr>
								<td><label>Number of Sessions</label></td>
								<td><input className='f4 pa2 w-50 center' name='maxsessions' type='number'  onChange={this.onMSessionsChange} /></td>
							</tr>
							<tr>
								<td><button className='w-100 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onTrainerSubmit}>Submit</button></td>
							</tr>
						</tbody>
				</table>
				</div>
			</div>
		</div>
		);
	}
}

export default PackageInputForm;
