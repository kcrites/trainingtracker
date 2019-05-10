import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PackageInfo from '../PackageInfo/PackageInfo';
import TrainingInputForm from '../TrainingInputForm/TrainingInputForm';
import Footer from '../Footer/Footer';

class Dashboard extends React.Component { 

    render() {
        const { stats, pack, loaded } = this.props;
        const { fName, email } = this.props.user;
        const { isTrainer } = this.props;
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
                getTrainingHistory={this.props.getTrainingHistory}
                getStatsHistory={this.props.getStatsHistory}
                historyLoaded={this.props.historyLoaded}
                loadUserPack={this.props.loadUserPack}/>

            {(!completed ? <TrainingInputForm email={email}
                pack={pack}
                packagedate={dateStarted}  //FIX THIS
                addSession={this.props.addSession}
                onRouteChange={this.props.onRouteChange}/> : '')}
            </div>
            <div className="box footer">
                <Footer onRouteChange={this.props.onRouteChange} isAdmin={isTrainer} />
            </div>
            </div>
        )
    }
}

export default Dashboard;