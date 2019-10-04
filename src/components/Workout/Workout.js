import React from 'react';
//import Groups from './Groups';
import ExerciseElement from './ExerciseElement';
import ShowWorkout from './ShowWorkout';

  let finalArray;

class Workout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
                exercise1: null,
                exercise2: null,
                exercise3: null,
                exercise4: null,
                exercise5: [],
                exercise6: [],
                exercise7: [],
                exercise8: [],
                exercise9: [],
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
            counter: 9,
            trainingDate: '',
            submitted: false,
            }
            this.dateToState(this.props.trainingDateSelected);
        }
       
    componentWillMount() {
       
    }
    dateToState = (originalDate) => {
        this.setState({trainingDate: originalDate})
    }

    checkForDuplicate = (ex, gp) => {
        let x;
        for(x in this.state){
            console.log(`x is: ${ex}`);
            if(x >= '0' && x <= '9' && this.state[x] != null && x !== gp){
                //It is a group object in state, not empty, and not the last (final) group id
                console.log(`hit check for duplicates + ${x} + ${ex} + ${gp}`);
                //check for ex in gp array
                //if found remove it   
                let temp = this.state[x];    
                //console.log('temp before: ' + temp);
               let found = temp.findIndex(function(repeat){
                   console.log(`repeat: ${repeat}`);
                   return repeat === ex;
               });
               if(found >= 0){
                temp.splice(found, 1);
               }else {
                   console.log('Not found');
               }
            };
            
        }
    }

    removeExisting(item){
        console.log(`Removing: ${item}`);
    }

	handleDateChange = (event) => {
		this.setState({trainingDate: event.target.value})
	}

	handleExChange = (event) => {
        let name = event.target.name;
        let temp = event.target.value;
		this.setState({...this.state, [name]: temp});
    }

    
    handleExGroup = (event) => {
        let name = event.target.name;
        name = name.substring(1);
       // let combo = '';
        let temp = event.target.value;
        let comboArray = [];
        
        if(this.state[temp] != null){
           // combo = this.state[temp] + ', ' + name;
           comboArray = this.state[temp];
            comboArray.push(name);
            console.log("comboarray "+ comboArray);
            this.setState({[temp]: comboArray});
        } else {
            comboArray = [name];
            console.log("comboarray "+ comboArray);
            this.setState({[temp]: comboArray});
        }
        this.checkForDuplicate(name, temp);
        
    }

    manageGroups = () => {
        //group workout and concat exercises
        let x, i = 0;
        let collectionArray = [];
        
        for(x in this.state){
            
            if(x >= '1' && x <= '9' && this.state[x] != null){
                let w = this.state[x];
                
                collectionArray[i] = [
                    x,w
                ];
            };
            i++;
        }
       console.table(collectionArray);
       return collectionArray;
    }

	handleSubmitWorkout = () => {
	//	const { email }  = this.props;
	//	const { exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, trainingDate } = this.state;
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
       this.setState({submitted: true});
        finalArray = this.manageGroups();        
    }

	handleKeyPress = ({ key }) => {
		if (key === "Enter") {
		  this.handleSubmitStats();
		}
	  }

	render(){
        const { fName, trainingDateSelected } = this.props;
        let j = this.state.counter;

var Object_rows=[];
for (var i=0; i < j; i++) {
    Object_rows.push(<ExerciseElement number={i+1} handleGFunction={this.handleExGroup} handleEFunction={this.handleExChange}/>
        )
} ;

		return (

            this.state.submitted ? <ShowWorkout workout={finalArray} fName={fName} dateSelected={trainingDateSelected} />
            :
			<div>
				<p className='f3'>
					{'Workout Planner for '+ fName + ' on ' + trainingDateSelected}
				</p>
				<div className='center'>
					<div className='pa4 br2 shadow-5 center'>
					<table>
					<tbody>
					<tr>
					<td><label>Date</label></td>
					 <td><input className='f4 pa2 w-240 center' name='date' value={trainingDateSelected} type='date'onChange={this.handleDateChange}/></td>
					 <td>Groups</td>
                     </tr>
                  
                     {Object_rows}
                    <tr>
					<td colSpan="3"><button className='w-75 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={this.handleSubmitWorkout} >Submit</button></td>
					</tr>
                    <tr>
                        <td>Example: </td><td colSpan="1" className='center w-100'>3 x 15 Pushups</td><td></td>
                        </tr></tbody>
					</table>
					</div>
				</div>
			</div>
			);
	}
}

export default Workout;
