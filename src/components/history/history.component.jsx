
import React from 'react';
import MeasurementsHistory  from './measurementshistory.component';
import TrainingHistory from './traininghistory.component';
import { connect } from 'react-redux';
import './history.styles.scss';
import { deleteTraining } from '../training-sessions/training-sessions.utils';
import { setIndicator } from '../../redux/indicator/indicator.actions';
import { withRouter, Link } from 'react-router-dom';


class History extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: [],
      viewSelectorInput: -1,
      trainingDeleted: false,
      deletedDate:'',
      sessionIndicator: false,
      sessionToggle: true,
      selfToggle: false,
      showSelfToggle: false
    };
  }

componentDidMount(){
  if(this.props.type === 'Measurements'){
    this.setState({ history: this.props.stats});
  } else if(this.props.type === 'Training'){
  this.setState({history: this.props.trainingList});
 // showSessionsByPackage( this.props.trainingList);//temp

  }
}
componentDidUpdate = (prevProps) => {
  if(this.props.type !== prevProps.type ) {
    // fetch the new product based and set it to the state of the component
    this.switchTypes();
 };
};

switchTypes = () => {
  if(this.props.type === 'Measurements'){
    this.setState({ history: this.props.stats});
  } else if(this.props.type === 'Training'){
  this.setState({history: this.props.trainingList});
 
  }
}

componentWillUnmount(){
  this.setState({history: []});
}

handleSessionChange = () => { //Manages when changing from session to session by package view
  //true = trainingList, false = trainingListByPack
  
  if(!this.state.sessionToggle){
    this.setState({history: this.props.trainingList});
  
  }
  else {
    if(this.state.viewSelectorInput !== -1){
    this.reduceList(this.props.trainingListByPack, this.state.viewSelectorInput)
    }
    else {this.setState({history: this.props.trainingListByPack});
    }
  }
  this.setState({sessionToggle: !this.state.sessionToggle});
}

reduceList = (array, valueInt) => { //Manages when the user selects limit on items in table
  let i = 0, tempArray = [];
  while(i <= valueInt-1){
    tempArray.push(array[i]);
    i++;
  }
  this.setState({history: tempArray});
}

filterSelf = (array, action, caller) => {
  let tempArray;
  if(caller === 'all'){
   if(action) {
    tempArray = array.filter(session => session.packageid  !== 0);
    this.setState({history: tempArray});
   } else this.setState({history: this.props.trainingList});
  } else if(caller === 'only'){
    if(action){
    tempArray = array.filter(session => session.packageid  === 0);
    this.setState({history: tempArray});
    } else this.setState({history: this.props.trainingList});
  }
}

handleSelectorChange = (event) => {
  //Change to reflect mulitple array sources
  let  array;
  if(this.props.type === 'Measurements') array = [...this.props.stats];
  else array = ((this.state.sessionToggle) ? [...this.props.trainingList] : [...this.props.trainingListByPack]);
  let valueInt = parseInt(event.target.value);
  this.setState({viewSelectorInput: valueInt});
  if(event.target.value === '-1' || (valueInt > array.length-1)){
    this.setState({history: array});
    return 
  } else {
    this.reduceList(array, valueInt);
  } 
}
//Add package number (example 2 of 11) on each row by running through in a function and adding to state

handleTrainingDelete = event => {
  const { id } = this.state.history[event.target.value];
  const { completed, packageid } = this.props.currentPackage;
  let completedFlag = false;
  //set flag to true if the training session being deleted set the completed flag to true
  if(completed && (this.state.history[event.target.value].packageid === parseInt(packageid))) {
    completedFlag = true;
  }
     if(deleteTraining(id, this.state.history[event.target.value].packageid, completedFlag)) {
       //set flag to update data from DB 
       this.props.setIndicator(false);
       let tempArray = [];
       tempArray = [...this.state.history];
       let cut = tempArray.splice([event.target.value],1);
       this.setState({trainingDeleted: true, history: tempArray, deletedDate: cut});
     }
}

handleHideSelf = ({target}) => {
 // console.log(target.checked);
  this.filterSelf(this.props.trainingList, target.checked, 'all');
  //filter self trainings
  this.setState({selfToggle: target.checked})
}

handleShowSelf = ({target}) => {
  //console.log(target.checked);
  this.filterSelf(this.props.trainingList, target.checked, 'only');
  //filter self trainings
  this.setState({selfToggle: target.checked})
}

  render(){
    const { type } = this.props;
    const { history } = this.state;
   if(!this.props.currentUser) {
     this.props.history.push("/signin");
   }
    if(history.length === 0 ) { //MODIFY TO ACCOUNT FOR INITIAL STATE
    return(<p className='history-title'> Your {type} history is empty</p>);
    } else{
        return (
          <div className="history-page">
          <div className="history-title">{`${type} History for ${this.props.activeName}`}</div>
          <button className=' training-link' ><Link to='/home'>Back to Dashboard</Link></button><span>  </span>
          {(type === 'Measurements') ? null : <button className='training-link' onClick={this.handleSessionChange}>  
          {(this.state.sessionToggle) ? 'Training by Package View' : 'Training by Session View'}</button>}
          <div><span className="self-text">Hide Self Trainings</span><input className="self-checkbox" type='checkbox' name='hide_self' onClick={this.handleHideSelf}/>
              <span className="self-text">- Show Only Self Trainings</span><input className="self-checkbox" type='checkbox' disabled={this.state.showSelfToggle}  name='only_self' onClick={this.handleShowSelf} />
          </div>
         <span className='delete-text-history'>{(this.state.trainingDeleted) ? 
            `Training Session Deleted: ${this.state.deletedDate[0].sessiondate}` : ''}</span>
            <div className="overflow-auto center table-div">
              
              {(type === 'Measurements')
                  ? <MeasurementsHistory array={history} indicator={this.props.indicators} />
                  : <TrainingHistory array={history} action={this.handleTrainingDelete} type={this.state.sessionToggle} />
              }             
            </div>
            <br></br>
            Show: <select onChange={this.handleSelectorChange}>
                      <option value="-1">All</option>
                      <option value="5">5</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                  </select>
          </div>
          );
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  stats: state.measurements.stats,
  trainingList: state.training.trainingList,
  currentPackage: state.pack.currentPackage,
  activeName: state.indicator.activeName,
  trainingListByPack: state.training.trainingListByPack
});

const mapDispatchToProps = dispatch => ({
   
  setIndicator: status => dispatch(setIndicator(status))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History));