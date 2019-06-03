import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PackageInfo from '../PackageInfo/PackageInfo';
import TrainingInputForm from '../TrainingInputForm/TrainingInputForm';
import Footer from '../Footer/Footer';

class Dashboard extends React.Component { 

    render() {
        const { stats, pack, loaded, addSession, onRouteChange } = this.props;
        const { fName, email } = this.props.user;
        const { isTrainer, emptyPackage, addPackage, loadUserPack, historyLoaded, getStatsHistory, getTrainingHistory } = this.props;
        const { completed, dateStarted } = this.props.pack;
        return (
            <div className="wrapper">
            {(isTrainer) ? <div className="box header headertitle">Trainer Input for {fName}</div> 
            : <div className="box header headertitle">{fName}</div> }
            <Sidebar stats={stats}/>
            <div className="box content">
                <PackageInfo
                    email={email}
                    pack={pack}
                    loaded={loaded}
                    isTrainer={isTrainer}
                    getTrainingHistory={getTrainingHistory}
                    getStatsHistory={getStatsHistory}
                    historyLoaded={historyLoaded}
                    loadUserPack={loadUserPack}
                    addPackage={addPackage}
                    emptyPackage={emptyPackage}/>

            {(!completed ? <TrainingInputForm email={email}
                pack={pack}
                packagedate={dateStarted}  //FIX THIS
                addSession={addSession}
                onRouteChange={onRouteChange}/> : '')}
            </div>
            <div className="box footer">
                <Footer onRouteChange={onRouteChange} isAdmin={isTrainer} />
            </div>
            </div>
        )
    }
}

export default Dashboard;