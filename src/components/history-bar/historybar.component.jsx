import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fixDate } from '../measurements/measurements.utils';

import './history-bar.styles.scss';

class HistoryBar extends React.Component {

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
        showPackToggle: true,
        packageDate: null
      };
    }

    componentDidMount(){
        this.setState({packageDate: fixDate(this.props.currentPackage.datestarted)});
    };
  
render(){
    const { type } = this.props;

   return(
       <div className='history-bar-box'>
        <div className="training-menu"><button className=' training-link' ><Link to='/home'>Back to Dashboard</Link></button><span>  </span>
                {(type === 'Measurements') ? null : <button className='training-link' onClick={this.handleSessionChange}>  
                {(this.state.sessionToggle) ? 'Training by Package View' : 'Training by Session View'}</button>}
                <span> </span>
                <button className="training-link-inverted" >
                  Hide Self Trainings <input type='checkbox' className="self-checkbox" name='hide_self' disabled={!this.state.showPackToggle} onClick={this.handleNoSelf}/>
                  </button>
                  <span> </span>
                  <button className="training-link-inverted">
                  Show Only Self Trainings <input type='checkbox' className="self-checkbox" disabled={!this.state.showSelfToggle}  name='only_self' onClick={this.handleOnlySelf} />
                </button>
        </div>
        <span className='delete-text-history'>Package Information: Package Date: {this.state.packageDate} - Sessions Used: {this.props.currentPackage.sessioncount} - Sessions Left: {this.props.currentPackage.maxsessions - this.props.currentPackage.sessioncount}</span>
            <span className='delete-text-history'>{(this.state.trainingDeleted) ? 
                  `Training Session Deleted: ${this.state.deletedDate[0].sessiondate}` : ''}
            </span>
       </div>
   );
   };

};

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
     
   
  })
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HistoryBar));