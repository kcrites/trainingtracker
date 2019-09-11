import React from 'react';
import Groups from './Groups';

class Workout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			exercise1: [],
			exercise2: [],
			exercise3: [],
			exercise4: [],
			exercise5: [],
            exercise6: [],
            exercise7: [],
            exercise8: [],
            exercise9: [],
			trainingDate: ''
            }
            this.dateToState(this.props.trainingDateSelected);
        }
        
    dateToState = (originalDate) => {
        this.setState({trainingDate: originalDate})
    }

	onDateChange = (event) => {
		this.setState({trainingDate: event.target.value})
	}

	handleEx1Change = (event) => {
        let temp = this.state.exercise1;
        temp[0] = event.target.value;
		this.setState({exercise1: temp});
    }
    
    handleEx1Group = (event) => {
        let temp = this.state.exercise1;
        temp[1] = event.target.value;
        this.setState({exercise1: temp});
    }

	handleEx2Change = (event) => {
        let temp = this.state.exercise2;
        temp[0] = event.target.value;
		this.setState({exercise2: temp});
    }
    
    handleEx2Group = (event) => {
        let temp = this.state.exercise2;
        temp[1] = event.target.value;
        this.setState({exercise2: temp});
    }

	onEx3Change = (event) => {
		this.setState({exercise3: event.target.value})
	}

	onEx4Change = (event) => {
		this.setState({exercise4: event.target.value})
	}

	onEx5Change = (event) => {
		this.setState({exercise4: event.target.value})
	}

	onEx6Change = (event) => {
		this.setState({exercise6: event.target.value})
	}

	handleSubmitWorkout = () => {
		const { email }  = this.props;
		const { exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, trainingDate} = this.state;
		/*fetch(serverURL + 'addstats', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
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

				this.props.onRouteChange('stats');
			}
		}) */
		console.log(`${trainingDate}, ${email}, ${exercise1}, ${exercise2}, ${exercise3}, ${exercise4}, ${exercise5}, ${exercise6}`)
	}

	handleKeyPress = ({ key }) => {
		if (key === "Enter") {
		  this.handleSubmitStats();
		}
	  }

	render(){

		return (
			<div>
				<p className='f3'>
					{this.props.fName + ': Workout Planner for ' + this.props.trainingDateSelected}
				</p>
				<div className='center'>
					<div className='pa4 br2 shadow-5 center'>
					<table>
					<tbody>
					<tr>
					<td><label>Date</label></td>
					 <td><input className='f4 pa2 w-240 center' name='date' value={this.props.trainingDateSelected} type='date'onChange={this.onDateChange}/></td>
					 <td>Groups</td>
                     </tr>
					 <tr><td>   <label>Exercise 1</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise1' type='text' onChange={this.handleEx1Change} /></td><td><Groups number={'1'} handleFunction={this.handleEx1Group}/></td>
					</tr>
					<tr><td>   <label>Exercise 2</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise2' type='text' onChange={this.handleEx2Change} /></td><td><Groups number={'2'} handleFunction={this.handleEx2Group}/></td></tr>
					<tr><td>   <label>Exercise 3</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise3' type='text' onChange={this.onEx3Change} /></td><td><Groups number={'3'}/></td></tr>
					<tr><td>   <label>Exercise 4</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise4' type='text' onChange={this.onEx4Change} /></td><td><Groups number={'4'}/></td></tr>
					<tr><td>   <label>Exercise 5</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise5' type='text' onChange={this.onEx5Change} /></td><td><Groups number={'5'}/></td></tr>
					<tr><td>   <label>Exercise 6</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise6' type='text' onChange={this.onEx6Change} /></td><td><Groups number={'6'}/></td></tr>
                    <tr><td><label>Exercise 7</label></td>
                     <td><input className='f4 pa2 w-250 center' name='exercise7' type='text' onChange={this.onEx7Change} /></td><td><Groups number={'7'}/></td></tr>
                    <tr><td>   <label>Exercise 8</label></td>
                      <td><input className='f4 pa2 w-250 center' name='exercise8' type='text' onChange={this.onEx8Change} /></td><td><Groups number={'8'}/></td></tr>
                    <tr><td>   <label>Exercise 9</label></td>
                     <td><input className='f4 pa2 w-250 center' name='exercise9' type='text' onChange={this.onEx9Change} onKeyDown={this.handleKeyPress}/></td><td><Groups number={'9'}/></td></tr>

                    <tr>
					<td colSpan="2"><button className='w-100 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitWorkout} >Submit</button></td>
					</tr></tbody>
					</table>
					</div>
				</div>
			</div>
			);
	}
}

export default Workout;
