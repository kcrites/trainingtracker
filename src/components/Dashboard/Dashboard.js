import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PackageInfo from '../PackageInfo/PackageInfo';
import TrainingInputForm from '../TrainingInputForm/TrainingInputForm';
import Footer from '../Footer/Footer';
import './Dashboard.css';
import StatsButton from '../StatsInputForm/StatsButton';
import { getPackageHistory, getMeasurementsHistory, getTrainingHistory } from '../measurements/measurements.utils';

//let email = 'kenrcrites@gmail.com';
//let serverURL = 'http://localhost:3005/';

class Dashboard extends React.Component { 
    constructor(){
        super();
        this.state = {
            loaded: false,
            pack:{},
            training: {},
            stats: {}
        }
    }

 componentWillMount(){
        if(!this.state.loaded) {
            this.getData();
		}
    }

     getData = async () => {
         const { email } = this.props.currentUser;
         const { serverURL } = this.props;
        const result3 = await getMeasurementsHistory(email, serverURL, this.storeInState); 
       
        const result2 = await getTrainingHistory(email, serverURL, this.storeInState);
         
        const result1 = await getPackageHistory(email, serverURL, this.storeInState); //Only returns active package (1)
        
        if(result1 && result2 && result3){
        this.setState({loaded: true})
        }
    }

    storeInState = (data, type) => {
        this.setState({[type]: data});
    } 

    render() {
        const { stats, loaded, addSession, onRouteChange, serverURL, workoutDate, trainingDateSelected, trainingPackageArr } = this.props;
        const { email } = this.props.user;
        const { isTrainer, emptyPackage, addPackage, loadUserPack, historyLoaded, getStatsHistory, getTrainingHistory } = this.props;
        const { dateStarted } = this.props.pack;
      
        return (
            <div className="wrapper">
            
            <div className="box header">
                <div className='header-flex'>
                    <StatsButton onRouteChange={onRouteChange}/>
                
                    <TrainingInputForm email={email}
                    pack={this.state.pack}
                    packagedate={dateStarted}  //FIX THIS
                    addSession={addSession}
                    getTrainingHistory={getTrainingHistory}
                    serverURL={serverURL}
                    workoutDate={workoutDate}
                    loadUserPack={loadUserPack}
                    trainingDateSelected={trainingDateSelected}
                    onRouteChange={onRouteChange}/> 
                </div>
            </div>
            
            <div className='aside-1 aside box'>
                <Sidebar stats={stats}/>
            </div>       
            
            <div className="box main shadow-3">
                 <PackageInfo
                    email={email}
                    pack={this.state.pack}
                    trainingPackageArr={trainingPackageArr}
                    loaded={loaded}
                    serverURL={serverURL}
                    isTrainer={isTrainer}
                    getTrainingHistory={getTrainingHistory}
                    getStatsHistory={getStatsHistory}
                    historyLoaded={historyLoaded}
                    loadUserPack={loadUserPack}
                    addPackage={addPackage}
                    emptyPackage={emptyPackage}/>
                
            </div>
            <div className="footer">
                <Footer onRouteChange={onRouteChange} isAdmin={isTrainer} />
            </div>
            </div>
        )
    }
}

export default Dashboard;

           /*   {(!completed ? <TrainingInputForm email={email}
                pack={pack}
                packagedate={dateStarted}  //FIX THIS
                addSession={addSession}
                serverURL={serverURL}
                workoutDate={workoutDate}
                trainingDateSelected={trainingDateSelected}
                onRouteChange={onRouteChange}/> : '')}  */