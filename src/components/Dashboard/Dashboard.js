import React from 'react';
import Footer from '../footer/footer.component';
import Sidebar from '../sidebar/sidebar.component';
import PackageInfo from '../packageinfo/packageinfo.component';
import StatsButton from '../stats-input-form/statsbutton.component';
import TrainingInputForm from '../training-input-form/training-input-form.component';
import ClientName from '../client-name/client-name.component';

import { getMeasurementsHistory } from '../measurements/measurements.utils';
import { getTrainingHistory } from '../training-sessions/training-sessions.utils';
import { getPackageHistory } from '../packages/packages.utils';
import { connect } from 'react-redux';
import { setMeasurements } from '../../redux/measurements/measurements.actions';
import { setTraining, setTrainingByPack } from '../../redux/training/training.actions';
import { setCurrentPackage } from '../../redux/package/package.actions';
import { setIndicator } from '../../redux/indicator/indicator.actions';
import { withRouter } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends React.Component { 
    constructor(){
        super();
        this.state = {
            loaded: false,
            
    }
}

 componentWillMount(){
     if(!this.props.currentUser) {
        this.props.history.push('/signin');
     } else {
        if(!this.props.dash) {
            this.getData(this.props.activeEmail);
        }
    }
    }

    //Get user data on measurements, trainings and packages
     getData = async (email) => {

        const result3 = await getMeasurementsHistory(email,  this.storeInState); 
      
        const result2 = await getTrainingHistory(email,  this.storeInState);
         
        const result1 = await getPackageHistory(email,  this.storeInState); //Only returns active package (1)

        if(result1 && result2 && result3 ){
            this.setState({loaded: true})
            this.props.setIndicator(true);
        }
    }

    storeInState = (data, type) => {
        if(type === 'stats'){
            this.props.setMeasurements(data);
        } else if(type === 'training') {
            this.props.setTraining(data);
        } else if(type === 'pack'){ 
            this.props.setCurrentPackage(data);
        } else if(type === 'sessionsbypack'){
            this.props.setTrainingByPack(data);
        }
    } 

    render() {
        if(!this.props.currentUser) {
            this.props.history.push("/signin");
            return <div>Loading page</div>
          } else {
    
        return (
            <div className="wrapper">
            
            <div className="name-box header">
                {(this.props.currentClient) ? <ClientName fname={this.props.currentClient.fname} /> : null}
            </div>
            
            <div className='aside-1 aside box'>
                <Sidebar />
                <StatsButton />
            </div>       
            
            <div className="box main shadow-3">
                 <PackageInfo />
            </div>
           
            <div className='aside-2 aside box'>
                <TrainingInputForm /> 
            </div>
           
            <div className="footer">
                <Footer  />
            </div>
            </div>
        )
          }
      
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    stats: state.measurements.stats,
    trainingList: state.training.trainingList,
    currentPackage: state.pack.currentPackage,
    dash: state.indicator.dash,
    activeName: state.indicator.activeName,
    activeEmail: state.indicator.activeEmail,
    currentClient: state.client.currentClient,
});

const mapDispatchToProps = dispatch => ({
   
    setMeasurements: stats => dispatch(setMeasurements(stats)),
    setCurrentPackage: pack => dispatch(setCurrentPackage(pack)),
    setTraining: train => dispatch(setTraining(train)),
    setIndicator: status => dispatch(setIndicator(status)),
    setTrainingByPack: sessions => dispatch(setTrainingByPack(sessions))
    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

