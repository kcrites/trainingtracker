
import React from 'react';
import MeasurementsHistory  from './measurementshistory.component';
import TrainingHistory from './traininghistory.component';
import { connect } from 'react-redux';
import './history.styles.scss';
import { deleteTraining } from '../training-sessions/training-sessions.utils';
import { setIndicator } from '../../redux/indicator/indicator.actions';
import { withRouter, Link } from 'react-router-dom';
import HistoryBar from '../history-bar/historybar.component';


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
      onlySelfToggle: false,
      noSelfToggle: false,
      showSelfToggle: true,
      showPackToggle: true
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

switchTypes = () => { //shows either measurements or training session in the history component
  if(this.props.type === 'Measurements'){
    this.setState({ history: this.props.stats});
  } else if(this.props.type === 'Training'){
  this.setState({history: this.props.trainingList});
 
  }
}

componentWillUnmount(){
  this.setState({history: []});
}

handleSessionChange = () => { //Manages when changing from session to session-by-package view
  //sessionToggle: true = trainingList, false = trainingListByPack
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
  console.log('delete function')
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

handleNoSelf = ({target}) => {
  if(!this.state.noSelfToggle){
    this.setState({noSelfToggle: target.checked, history: this.props.trainingListNoSelf, showSelfToggle: false})
  } else if(this.state.sessionToggle) {
    this.setState({noSelfToggle: false, history: this.props.trainingList, showSelfToggle: true})
    }
    else this.setState({noSelfToggle: false, history: this.props.trainingListByPack, showSelfToggle: true})
}

handleOnlySelf = ({target}) => {
  if(!this.state.onlySelfToggle){
  this.setState({onlySelfToggle: target.checked, history: this.props.trainingListOnlySelf, showPackToggle: false})
} else if(this.state.sessionToggle) {
  this.setState({onlySelfToggle: false, history: this.props.trainingList, showPackToggle: true})
  }
  else this.setState({onlySelfToggle: false, history: this.props.trainingListByPack, showPackToggle: true})
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
          <article className=" mw9 mw9-ns br3 hidden ba b--black-10 mv1">
            <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{`${type} History for ${this.props.activeName}`}</h1>
            <div className="pa3 bt b--black-10">	
            <HistoryBar type={type} handleOnlySelf={this.handleOnlySelf} handleNoSelf={this.handleNoSelf} handleSessionChange={this.handleSessionChange}/>
                    <div className="overflow-auto center table-div">
                      
                      {(type === 'Measurements')
                          ? <MeasurementsHistory array={history} indicator={this.props.indicators} />
                          : <TrainingHistory array={history} action={this.handleTrainingDelete} type={this.state.sessionToggle} />
                      }             
                    </div>
            </div>
          </article>
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
  trainingListByPack: state.training.trainingListByPack,
  trainingListNoSelf: state.training.trainingListNoSelf,
  trainingListOnlySelf: state.training.trainingListOnlySelf
});

const mapDispatchToProps = dispatch => ({
   
  setIndicator: status => dispatch(setIndicator(status))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History));