
import React from 'react';
import { RenderRowTraining, RenderRowMeasurements, RenderColumn } from '../render-row/render-row.component';
import { connect } from 'react-redux';
import './history.styles.scss';
import { deleteTraining } from '../training-sessions/training-sessions.utils';
import { setIndicator } from '../../redux/indicator/indicator.actions';
import { withRouter, Link } from 'react-router-dom';
const measurementColumnArray = [
        'Number', 'Date', 'Weight', 'Muscle Mass', 'Fat Level', 'BMI', 'Fat Level Organs', '%Body Water'
    ];

  const trainingColumnArray = 
    [
        'Number', 'Date', 'Package Date', 'Delete'
    ];


class History extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: [],
      viewSelectorInput: -1,
      trainingDeleted: false,
      deletedDate:''
    };
  }

componentDidMount(){
  if(this.props.type === 'Measurements'){
    this.setState({ history: this.props.stats});
  } else if(this.props.type === 'Training'){
  this.setState({history: this.props.trainingList});

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

handleSelectorChange = (event) => {
  //Change to reflect mulitple array sources
  let  array;
  if(this.props.type === 'Measurements') array = [...this.props.stats];
  else array = [...this.props.trainingList];
  let valueInt = parseInt(event.target.value);
  this.setState({viewSelectorInput: event.target.value});
  if(event.target.value === '-1' || (valueInt > array.length-1)){
    this.setState({history: array});
    return 
  } else {
    let i = 0, tempArray = [];
    while(i <= valueInt-1){
      tempArray.push(array[i]);
      i++;
    }
    this.setState({history: tempArray});
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



  render(){
    const { type } = this.props;
   // const { displayName , isTrainer} = this.props.currentUser;
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
          <div><Link className='option' to='/home'>Back to Dashboard</Link></div>
         <span className='delete-text-history'>{(this.state.trainingDeleted) ? `Training Session Deleted: ${this.state.deletedDate[0].sessiondate}` : ''}</span>
            <div className="overflow-auto center table-div">
              <table className="history-table" cellSpacing="0">
                <thead>
                  <tr className="stripe-dark">
                    {(type === 'Measurements')
                    ? <RenderColumn array={measurementColumnArray} />
                    : <RenderColumn array={trainingColumnArray} />
                    }
                  
                  </tr>
                </thead>
                <tbody className="lh-copy">
                {(type === 'Measurements') ? 
                  <RenderRowMeasurements array={history} indicator={this.props.indicators} />
                :
                  <RenderRowTraining array={history} action={this.handleTrainingDelete} />
                } 
                </tbody>
              </table>
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
  activeName: state.indicator.activeName
});

const mapDispatchToProps = dispatch => ({
   
  setIndicator: status => dispatch(setIndicator(status))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History));