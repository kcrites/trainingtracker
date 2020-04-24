import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PackageInfo from '../PackageInfo/PackageInfo';
import TrainingInputForm from '../TrainingInputForm/TrainingInputForm';
import Footer from '../Footer/Footer';
import './Dashboard.css';
import StatsButton from '../StatsInputForm/StatsButton';
import { getMeasurementsHistory } from '../measurements/measurements.utils';
import { getTrainingHistory } from '../training-sessions/training-sessions.utils';
import { getPackageHistory } from '../packages/packages.utils';
import { connect } from 'react-redux';

class Dashboard extends React.Component { 
    constructor(){
        super();
        this.state = {
            loaded: false,
            pack:{},
            training: {},
            stats: [{statsdate:'Loading', weight:0,musclemass:0,fatlevel:0,bmi:0,vv:0,percentwater:0 }]
    }
}

 componentWillMount(){
     console.log(`loaded in dashboard: ${this.state.loaded}`);
        if(!this.state.loaded) {
            this.getData();
		}
    }

     getData = async () => {
         const { email } = this.props.currentUser;
        
        const result3 = await getMeasurementsHistory(email,  this.storeInState); 
       
        const result2 = await getTrainingHistory(email,  this.storeInState);
         
        const result1 = await getPackageHistory(email,  this.storeInState); //Only returns active package (1)
        
        if(result1 && result2 && result3){
        this.setState({loaded: true})
       
        }
    }

    storeInState = (data, type) => {
        this.setState({[type]: data});
    } 

    render() {
        const { loaded, addSession, onRouteChange, workoutDate, trainingDateSelected, trainingPackageArr } = this.props;
        
        const { emptyPackage, addPackage, loadUserPack, historyLoaded, getStatsHistory, getTrainingHistory } = this.props;
       
        const { pack, stats } = this.state;
    
        return (
            <div className="wrapper">
            
            <div className="box header">
                <div className='header-flex'>
                    <StatsButton onRouteChange={onRouteChange}/>
                
                    <TrainingInputForm
                    pack={pack}
                    packagedate={this.state.pack.dateStarted}  //FIX THIS
                    addSession={addSession}
                    getTrainingHistory={getTrainingHistory}
                   
                    workoutDate={workoutDate}
                    loadUserPack={loadUserPack}
                    trainingDateSelected={trainingDateSelected}
                    onRouteChange={onRouteChange}/> 
                </div>
            </div>
            
            <div className='aside-1 aside box'>
                <Sidebar stats={stats[0]}/>
            </div>       
            
            <div className="box main shadow-3">
                 <PackageInfo
                    pack={this.state.pack}
                    trainingPackageArr={trainingPackageArr}
                    loaded={loaded}
                   
                    getTrainingHistory={getTrainingHistory}
                    getStatsHistory={getStatsHistory}
                    historyLoaded={historyLoaded}
                    loadUserPack={loadUserPack}
                    addPackage={addPackage}
                    emptyPackage={emptyPackage}/>
            </div>
            <div className="footer">
                <Footer onRouteChange={onRouteChange} />
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Dashboard);

           /*   {(!completed ? <TrainingInputForm email={email}
                pack={pack}
                packagedate={dateStarted}  //FIX THIS
                addSession={addSession}
                serverURL={serverURL}
                workoutDate={workoutDate}
                trainingDateSelected={trainingDateSelected}
                onRouteChange={onRouteChange}/> : '')}  */