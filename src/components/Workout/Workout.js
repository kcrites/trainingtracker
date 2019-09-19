import React from 'react';
import Groups from './Groups';

//var sortedUniq = require('./lodash.sorteduniq');

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
            counter: 9,
            trainingDate: '',
            distinctGroups: [],
            }
            this.dateToState(this.props.trainingDateSelected);
        }
        
    dateToState = (originalDate) => {
        this.setState({trainingDate: originalDate})
    }

	handleDateChange = (event) => {
		this.setState({trainingDate: event.target.value})
	}

	handleExChange = (event) => {
        let name = event.target.name;
        let temp = this.state[name];
        temp[0] = event.target.value;
		this.setState({[name]: temp})
    }
    
    handleExGroup = (event) => {
        let name = event.target.name;
        name = name.substring(1);
        let temp = this.state[name];
        temp[1] = event.target.value;
        this.setState({[name]: temp});
    }

    manageGroups = (tempArray) => {
        //sortedUniq(tempArray);
        this.setState({distinctGroups: tempArray});
        
        console.log(`tempArray of Groups: ${tempArray}`);
    }

	handleSubmitWorkout = () => {
		const { email }  = this.props;
		const { exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, trainingDate, distinctGroup} = this.state;
		/*fetch(serverURL + 'addworkout', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
                email: email,
                trainingdate: trainingDate

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
       // this.manageGroups(this.state.distinctGroups);
       // this.props.storeWorkout(this.state);
        this.props.onRouteChange('showWorkout');
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
					{'Workout Planner for '+ this.props.fName + ' on ' + this.props.trainingDateSelected}
				</p>
				<div className='center'>
					<div className='pa4 br2 shadow-5 center'>
					<table>
					<tbody>
					<tr>
					<td><label>Date</label></td>
					 <td><input className='f4 pa2 w-240 center' name='date' value={this.props.trainingDateSelected} type='date'onChange={this.handleDateChange}/></td>
					 <td>Groups</td>
                     </tr>
					 <tr><td>   <label>Exercise 1</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise1' type='text' onChange={this.handleExChange} /></td><td><Groups number={'1'} handleFunction={this.handleEx1roup}/></td>
					</tr>
					<tr><td>   <label>Exercise 2</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise2' type='text' onChange={this.handleExChange} /></td><td><Groups number={'2'} handleFunction={this.handleExGroup}/></td></tr>
					<tr><td>   <label>Exercise 3</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise3' type='text' onChange={this.handleExChange} /></td><td><Groups number={'3'} handleFunction={this.handleExGroup}/></td></tr>
					<tr><td>   <label>Exercise 4</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise4' type='text' onChange={this.handleExChange} /></td><td><Groups number={'4'} handleFunction={this.handleExGroup}/></td></tr>
					<tr><td>   <label>Exercise 5</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise5' type='text' onChange={this.handleExChange} /></td><td><Groups number={'5'} handleFunction={this.handleExGroup}/></td></tr>
					<tr><td>   <label>Exercise 6</label></td>
					    <td><input className='f4 pa2 w-250 center' name='exercise6' type='text' onChange={this.handleExChange} /></td><td><Groups number={'6'} handleFunction={this.handleExGroup}/></td></tr>
                    <tr><td><label>Exercise 7</label></td>
                     <td><input className='f4 pa2 w-250 center' name='exercise7' type='text' onChange={this.hndleExChange} /></td><td><Groups number={'7'} handleFunction={this.handleExGroup}/></td></tr>
                    <tr><td>   <label>Exercise 8</label></td>
                      <td><input className='f4 pa2 w-250 center' name='exercise8' type='text' onChange={this.handleExChange} /></td><td><Groups number={'8'} handleFunction={this.handleExGroup}/></td></tr>
                    <tr><td>   <label>Exercise 9</label></td>
                     <td><input className='f4 pa2 w-250 center' name='exercise9' type='text' onChange={this.handleExChange} onKeyDown={this.handleKeyPress}/></td><td><Groups number={'9'} handleFunction={this.handleExGroup}/></td></tr>

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
