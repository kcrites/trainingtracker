import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PackageInfo from '../PackageInfo/PackageInfo';
import TrainingInputForm from '../TrainingInputForm/TrainingInputForm';
import Footer from '../Footer/Footer';
import './Dashboard.css';
import StatsButton from '../StatsInputForm/StatsButton';

class Dashboard extends React.Component { 

    render() {
        const { stats, pack, loaded, addSession, onRouteChange, serverURL, workoutDate, trainingDateSelected, trainingPackageArr } = this.props;
        const { email } = this.props.user;
        const { isTrainer, emptyPackage, addPackage, loadUserPack, historyLoaded, getStatsHistory, getTrainingHistory } = this.props;
        const { completed, dateStarted } = this.props.pack;
      
        return (
            <div className="wrapper">
            
            <div className="box header">
                <div className='header-flex'>
                    <StatsButton onRouteChange={onRouteChange}/>
                    {/* {(isTrainer) ? <div className="box header headertitle">Trainer Input for {fName}</div> 
                         : <div className="box header headertitle">{fName}</div> } */}
                    {(!completed ? <TrainingInputForm email={email}
                    pack={pack}
                    packagedate={dateStarted}  //FIX THIS
                    addSession={addSession}
                    getTrainingHistory={getTrainingHistory}
                    serverURL={serverURL}
                    workoutDate={workoutDate}
                    loadUserPack={loadUserPack}
                    trainingDateSelected={trainingDateSelected}
                    onRouteChange={onRouteChange}/> : '')}
                    </div>
            </div>
            
            <div className='aside-1 aside box'>
                <Sidebar stats={stats}/>
            </div>       
            
            <div className="box main shadow-3">
                 <PackageInfo
                    email={email}
                    pack={pack}
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
            <div className=" footer ">
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