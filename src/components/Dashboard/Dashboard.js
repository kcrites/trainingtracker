import React from 'react';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import PackageInfo from '../PackageInfo/PackageInfo';
import StatsButton from '../StatsInputForm/StatsButton';
import TrainingInputForm from '../TrainingInputForm/TrainingInputForm';

import { getMeasurementsHistory } from '../measurements/measurements.utils';
import { getTrainingHistory } from '../training-sessions/training-sessions.utils';
import { getPackageHistory} from '../packages/packages.utils';
import { connect } from 'react-redux';
import { setMeasurements } from '../../redux/measurements/measurements.actions';
import { setTraining } from '../../redux/training/training.actions';
import { setCurrentPackage } from '../../redux/package/package.actions';
import { setIndicator } from '../../redux/indicator/indicator.actions';

import './Dashboard.css';

class Dashboard extends React.Component { 
    constructor(){
        super();
        this.state = {
            loaded: false,
            pack:{},
            training: {},
            email: '',
            stats: [{statsdate:'Loading', weight:0,musclemass:0,fatlevel:0,bmi:0,vv:0,percentwater:0 }]
    }
}

 componentWillMount(){
     //console.log(`loaded in dashboard: ${this.state.email}, ${this.props.dash}, ${this.props.currentClient.email}`);
     let tempEmail = '';
        if(!this.props.dash) {
            if(this.props.currentUser.isTrainer){
                //set email address to client email address from clients redux store
                console.log('Trainer version of dashboard');
                this.setState({email: this.props.currentClient.email});
                tempEmail = this.props.currentClient.email;
            } else {
                this.setState({email: this.props.currentUser.email});
                tempEmail = this.props.currentUser.email;
            } 
            this.getData(tempEmail);
        }
    }

    //Get user data on measurements, trainings and packages
     getData = async (email) => {


        const result3 = await getMeasurementsHistory(email,  this.storeInState); 
      
        const result2 = await getTrainingHistory(email,  this.storeInState);
         
        const result1 = await getPackageHistory(email,  this.storeInState); //Only returns active package (1)

        if(result1 && result2 && result3){
            this.setState({loaded: true})
            this.props.setIndicator(true);
        }
    }

    storeInState = (data, type) => {
        if(type === 'stats'){
            this.props.setMeasurements(data);
        } else if(type === 'training') {
           // this.setState({[type]: data});
            this.props.setTraining(data);
        } else if(type === 'pack'){ 
           // this.setState({[type]: data});
            this.props.setCurrentPackage(data);
        } 
    } 

    render() {
        const { onRouteChange } = this.props;
      
        return (
            <div className="wrapper">
            
            <div className="box header">
           {/*      <div className='header-flex'>
                    <StatsButton onRouteChange={onRouteChange}/>
                
                    <TrainingInputForm onRouteChange={onRouteChange}/> 
                </div> */}
            </div>
            
            <div className='aside-1 aside box'>
                <Sidebar />
                <StatsButton onRouteChange={onRouteChange}/>
            </div>       
            
            <div className="box main shadow-3">
                 <PackageInfo />
            </div>
           
            <div className='aside-2 aside box'>
                <TrainingInputForm onRouteChange={onRouteChange}/> 
            </div>
           
            <div className="footer">
                <Footer onRouteChange={onRouteChange} />
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    stats: state.measurements.stats,
    trainingList: state.training.trainingList,
    currentPackage: state.pack.currentPackage,
    dash: state.indicator.dash,
    currentClient: state.client.currentClient
});

const mapDispatchToProps = dispatch => ({
   
    setMeasurements: stats => dispatch(setMeasurements(stats)),
    setCurrentPackage: pack => dispatch(setCurrentPackage(pack)),
    setTraining: train => dispatch(setTraining(train)),
    setIndicator: status => dispatch(setIndicator(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

