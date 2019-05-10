import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import PackageInfo from '../components/PackageInfo/PackageInfo';
import TrainingInputForm from '../components/TrainingInputForm/TrainingInputForm';
import Footer from '../componentns/Footer/Footer';

class Dashboard extends React.Component { 

    render() {
        const {stats, pack, loaded} = this.props;
        const {fName, email, isAdmin, isTrainer} = this.props.user;
        const { completed, dateStarted} = this.props.pack;
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
                getTrainingHistory={this.getTrainingHistory}
                getStatsHistory={this.getStatsHistory}
                historyLoaded={this.historyLoaded}
                loadUserPack={this.loadUserPack}/>

            {(!completed ? <TrainingInputForm email={email}
                pack={pack}
                packagedate={dateStarted}  //FIX THIS
                addSession={this.addSession}
                onRouteChange={this.onRouteChange}/> : '')}
            </div>
            <div className="box footer">
                <Footer onRouteChange={this.onRouteChange} isAdmin={isAdmin} />
            </div>
            </div>
        )
    }
}

export default Dashboard;