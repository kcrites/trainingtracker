import React from 'react';
import ExerciseElement from './ExerciseElement';
import ShowWorkout from './ShowWorkout';
import Popout from '../Popout/Popout';
import ExampleImage from './ExampleImage.png';

let finalArray;

let workoutHelp = <div><h2>Workout Plannning Help</h2>
    <p>The workouts consist of a description of the workout and then a grouping.</p>
    <p>For example: Group 1 has 3x10 Situps, 3x15 Pullups, 3x10 back extensions</p>
    <p>You would list each exercise in the field and select the group that it belongs to.</p>
    <img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '120px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={ExampleImage} />
    <p>You don't need to use a group. If there isn't one for the training, just leave the group selection on 0.</p>
    <p>Currently this page supports 9 exercises and 10 groups.</p>
    </div>

class Workout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
                exercise1: null,
                exercise2: null,
                exercise3: null,
                exercise4: null,
                exercise5: null,
                exercise6: null,
                exercise7: null,
                exercise8: null,
                exercise9: null,
                groupArray: [],
                group0: null,
                group1: null,
                group2: null,
                group3: null,
                group4: null,
                group5: null,
            eCounter: 9,
            gCounter: 5,
            trainingDate: '',
            submitted: false,
            showPopup: false,
            }
        }
       
    componentWillMount() {
        this.dateToState(this.props.trainingDateSelected);
    }

    componentDidMount() {
        this.groupArraySetup(this.state.eCounter);
    }

    dateToState = (originalDate) => {
        this.setState({trainingDate: originalDate})
    }

    groupArraySetup = (exerciseCount) => {
        let array = [];
        for(let i = 0; i < exerciseCount; i++){
            array[i] = 'group0';
        }
        //console.log(array);
        this.setState({groupArray : array});
    }

    exerciseIsValid = (num) => {
        if(this.state[num] === null) {
            return true;
        } else {
            return false;
        }
    }

    togglePopup() {
		this.setState({
		  showPopup: !this.state.showPopup
		});
	  }

    checkForDuplicate = (ex, gp) => {
        let x, j;
        for(x in this.state){
   
           j = x;
           x = x.substr(5, 1);
        
            if(x >= '0' && x <= '9' && this.state[j] != null && j !== gp){
                //It is a group object in state, not empty, and not the last (final) group id
                //check for ex in gp array
                //if found remove it   
                let temp = this.state[j];    
                let found = temp.findIndex(function(repeat){
                   return repeat === ex;
               });
               if(found >= 0){
                temp.splice(found, 1);
               } else {
                   console.log('Not found');
               }
            };
        }
    }

	handleDateChange = (event) => {
		this.setState({trainingDate: event.target.value})
	}

	handleExChange = (event) => {
        let name = event.target.name;
        let temp = event.target.value;
		this.setState({...this.state, [name]: temp});
    }

    //****handle a group selection with a null exercise field ****
    //**** handle group 0 when no action is triggered on selection */
    handleExGroup = (event) => {
        let longName = event.target.name; // gexercise1
        let name = longName.substring(1); //exercise1
        let number = longName.substring(9); //1
        let valueGp = event.target.value; // group1
        let tempArray = this.state.groupArray;
        tempArray[number-1] = valueGp;
        
        // start area to verify group selected
        if(this.state[name] === null) {
            tempArray[number-1] = 'group0';
            this.setState({groupArray: tempArray});
            return window.alert('Please enter an exercise first');
        }
          this.setState({groupArray: tempArray});
          // end of group selector area

        let comboArray = [];
// console.log(`name: ${event.target.name} value: ${event.target.value} state: ${this.state[name]}`);
        if(this.state[valueGp] != null){
            comboArray = this.state[valueGp];
            comboArray.push(this.state[name]);
            this.setState({[valueGp]: comboArray});
        } else {
            comboArray = [this.state[name]];
            this.setState({[valueGp]: comboArray});
        }
        this.checkForDuplicate(this.state[name], valueGp);
        
    }

    manageGroups = () => {
        //group workout and concat exercises
        let x, j, i = 0;
        let collectionArray = [];
      //  console.log('hitting managegroups');
        for(x in this.state){
            j = x;
            x = x.substr(5, 1);
           //console.log(`j: ${j} x: ${x}`);
            if(x >= '0' && x <= '9' && this.state[j] != null){
                let w = this.state[j];
                collectionArray[i] = [
                    j,w
                ]; //console.log(`w: ${w} state at w: ${this.state[w]}`);
                i++;
            };
        }
       console.table(collectionArray);
       return collectionArray;
    }

	handleSubmitWorkout = () => {
		const { email , serverURL}  = this.props;
        const { exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, trainingDate } = this.state;
        const { group1, group2, group3, group4, group5 } = this.state;
        const { exercise7, exercise8, exercise9 } = this.state;
		fetch(serverURL + 'updateworkout', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
                email: email,
                trainingdate: trainingDate,
                exercise1: exercise1,
                exercise2: exercise2,
                exercise3: exercise3,
                exercise4: exercise4,
                exercise5: exercise5,
                exercise6: exercise6,
                exercise7: exercise7,
                exercise8: exercise8,
                exercise9: exercise9,
                group1: group1,
                group2: group2,
                group3: group3,
                group4: group4,
                group5: group5,
			})
		})
            //	.then(response => response.json())
        .then(console.log('Fetch call'))
        /* 		.then(workoutPlan => {
                    if(workoutPlan){
                        console.log('workout sent to Node.js');
                    }
                })  */
    
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
        const { groupArray } = this.state;
        let j = this.state.eCounter;

        var Object_rows=[];
        for (var i=0; i < j; i++) {
            Object_rows.push(<ExerciseElement number={i+1} handleGFunction={this.handleExGroup}
                                            handleEFunction={this.handleExChange} groupArray={groupArray}/>
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
                        <td colSpan="3"><button onClick={this.togglePopup.bind(this)}>Workout Help</button></td>
                        <td>
                        <div>
						  {this.state.showPopup ? 
								<Popout
									text={workoutHelp}
									closePopup={this.togglePopup.bind(this)}
								/>
								: null
								}
						  </div>
                        </td>
                        </tr>
                        </tbody>
					</table>
					</div>
				</div>
			</div>
			);
	}
}

export default Workout;
