import React from 'react';

class StatsInputForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			statsWeight: 0,
			statsMuscleMass: 0,
			statsFatLevel:0,
			statsBMI:0,
			statsVV:0,
			statsPercentWater:0,
			statsDate: ''
			}
		}

	onDateChange = (event) => {
		this.setState({statsDate: event.target.value})
	}

	onWeightChange = (event) => {
		this.setState({statsWeight: event.target.value})
	}

	onMuscleMassChange = (event) => {
		this.setState({statsMuscleMass: event.target.value})
	}

	onFatLevelChange = (event) => {
		this.setState({statsFatLevel: event.target.value})
	}

	onBMIChange = (event) => {
		this.setState({statsBMI: event.target.value})
	}

	onVVChange = (event) => {
		this.setState({statsVV: event.target.value})
	}

	onPercentWaterChange = (event) => {
		this.setState({statsPercentWater: event.target.value})
	}

	onSubmitStats = () => {
		const { name, email, height }  = this.props;
		const { statsWeight, statsMuscleMass, statsFatLevel, statsBMI, statsVV, statsPercentWater, statsDate} = this.state;
		fetch('http://localhost:3001/addstats', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				email: email,
				height: height,
				weight: statsWeight,
				musclemass: statsMuscleMass,
				fatlevel: statsFatLevel,
				bmi: statsBMI,
				vv: statsVV,
				percentwater: statsPercentWater,
				statsdate: statsDate
			})
		})
		.then(response => response.json())
		.then(userStats => {
			if(userStats){
			let d = new Date(this.state.statsDate);
			let tempD = d.toLocaleDateString();
				this.props.statAdmin(tempD, statsWeight, statsMuscleMass, statsFatLevel, 
					statsBMI, statsVV, statsPercentWater);
					console.log(tempD, this.state.statsWeight, this.state.statsMuscleMass, this.state.statsFatLevel, 
						this.state.statsBMI, this.state.statsVV, this.state.statsPercentWater);
				this.props.onRouteChange('stats');
			}
		})
		
	}

	render(){

		return (
			<div>
				<p className='f3'>
					{this.props.name + ': Please input your measurments'}
				</p>
				<div className='center'>
					<div className='pa4 br2 shadow-5 center'>
					<table>
					<tbody>
					<tr>
					<td><label>Date</label></td>
					 <td><input className='f4 pa2 w-80 center' name='date' type='date'onChange={this.onDateChange}/></td>
					 </tr>
					 <tr><td>   <label>Weight</label></td>
					<td><input className='f4 pa2 w-50 center' name='weight' type='number' step='.1' onChange={this.onWeightChange} /></td>
					</tr>
					<tr><td>   <label>Muscle Mass</label></td>
					<td><input className='f4 pa2 w-50 center' name='muscleMass' type='number' step='.1' onChange={this.onMuscleMassChange} /></td></tr>
					<tr><td>   <label>Fat Level</label></td>
					<td><input className='f4 pa2 w-50 center' name='fatLevel' type='number' step='.1' onChange={this.onFatLevelChange} /></td></tr>
					<tr><td>   <label>BMI</label></td>
					<td><input className='f4 pa2 w-50 center' name='bmi' type='number' step='.1' onChange={this.onBMIChange} /></td></tr>
					<tr><td>   <label>VV</label></td>
					<td><input className='f4 pa2 w-50 center' name='vv' type='number' step='.1' onChange={this.onVVChange}/></td></tr>
					<tr><td>   <label>Percent Water</label></td>
					<td><input className='f4 pa2 w-50 center' name='percentWater'  type='number' step='.1' onChange={this.onPercentWaterChange}/></td></tr>
					<tr>
					<td colSpan="2"><button className='w-100 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={this.onSubmitStats}>Submit</button></td>
					</tr></tbody>
					</table>
					</div>
				</div>
			</div>
			);
	}
}

export default StatsInputForm;
