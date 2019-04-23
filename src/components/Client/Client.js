import React from 'react';
import Footer from './components/Footer/Footer';
import PackageInfo from './components/PackageInfo/PackageInfo';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import Sidebar from './components/Sidebar/Sidebar';

class Client extends React.Component { 
	constructor(props){
		super(props);
		this.state = {

		}
    }

// Render page that allows the trainer to start a new traininer session.
// This includes last measurements and training date/details.
// Allows trainer to submit new training date, enter in measurements, and
// in the future will give an area to list workout plans/actuals


render() {   
    const {date, weight, musclemass, fatlevel, bmi, vv, percentwater} = this.props.stats;
    const {name, email, isAdmin, isTrainer} = this.props.user;
    const { completed, sessionCount, sessionsLeft, dateStarted, packageId} = this.props.package;
    return (
        <div className="wrapper">
            {(isTrainer) ? <div className="box header headertitle">Trainer Input for {name}</div> 
            : <div className="box header headertitle">{name}</div> }
            <Sidebar date={date} weight={weight} 
                musclemass={musclemass} fatlevel={fatlevel}
                bmi={bmi} vv={vv} percentwater={percentwater} />
        <div className="box content">
            <PackageInfo name={name}
                email={email}
                completed={completed}
                sessionCount={sessionCount}
                sessionsLeft={sessionsLeft}
                dateStarted={dateStarted}
                loaded={this.state.loaded}
                getTrainingHistory={this.getTrainingHistory}
                getStatsHistory={this.getStatsHistory}
                historyLoaded={this.historyLoaded}
                loadUserPack={this.loadUserPack}/>

            {(!completed ? <TrainingInputForm email={email}
                packageId={packageId}
                packagedate={dateStarted}
                completed={completed}
                addSession={this.addSession}
                sessionCount={sessionCount}
                onRouteChange={this.onRouteChange}/> : '')}
            </div>
            <div className="box footer">
            <Footer onRouteChange={this.onRouteChange} isAdmin={isAdmin} />
            </div>
        </div>
    )};
    
}


export default Client;