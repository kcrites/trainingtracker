import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Stats from './components/Stats/Stats';
import StatsInputForm from './components/StatsInputForm/StatsInputForm';
import TrainingHistory from './components/TrainingHistory/TrainingHistory';
import Trainer from './components/Trainer/Trainer';
import PackageInputForm from './components/PackageInputForm/PackageInputForm';
import Help from './components/Help/Help';
import TrainerInfo from './components/TrainerInfo/TrainerInfo';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';


const trainingHistoryArr = [];
const statHistoryArr = [];
const allUserHistoryArr = []; //For Admin Panel
const fixDate = (olddate) => {
      let d = new Date(olddate);
      let newdate = d.toLocaleDateString();
      //console.log(`month: ${d.getMonth()}`);
      return newdate;
}

const initialState = {
  
    input: '',     
    route: 'signin',
    isSignedIn: false,
    loaded: false,   
    user: {
      id: '',
      fName: '',
      lName: '',
      email: '',
      height: '',
      isAdmin: false,
      isTrainer: false,
      trainer: '', 
      joined: ''
    },
    pack: 
    {
      dateStarted: undefined,
      packageId: 0,
      completed: false,
      sessionCount: 0,
      sessionsLeft: 0,
      maxSessions: 0
    },
    stats :
    {
      date: '',
      weight: 0.0,
      musclemass: 0.0,
      fatlevel: 0.0,
      bmi: 0.0,
      vv: 0.0,
      percentwater: 0.0
    },
    trainer :
    {
      fName: null,
      email: null,
      isTrainer: false
    }
  }


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
   
  }

//Load Data into State and Arrays
//Puts user information into state after signin
 loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        fName: data.fname,
        lName: data.lname,
        email: data.email,
        height: data.height,
        isAdmin: data.isadmin,
        isTrainer: data.istrainer,
        trainer: data.trainer, 
        joined: data.joined
    }})
  }
//Loads last items in the stats array to state for display in panel
  loadLastStat = (data) => {
    this.setState({
      stats: {
        date: fixDate(data.statsdate),
        weight: data.weight,
        musclemass: data.musclemass,
        fatlevel: data.fatlevel,
        bmi: data.bmi,
        vv: data.vv,
        percentwater: data.percentwater
      }
    })
  }

//Training Package Information and calculate sessions left (sl)
  loadUserPack = (data) => {
    let sl = data.maxsessions - data.sessioncount;
    let fixed = fixDate(data.datestarted);
    this.setState( {
      pack: {
        dateStarted: fixed,
        packageId: data.packageid,
        completed:data.completed,
        maxSessions:data.maxsessions,
        sessionsLeft:sl,
        sessionCount: data.sessioncount
    }})
  }

  loadTrainer = (data) => {
    this.setState( {
      trainer: {
        fName: data.fname,
        email: data.email,
        isTrainer: true,
      }
    })
  }
  
//Stats (Measurements) Information ***MOVE THE ARGS INTO STATE IN THE COMPONENT
  statAdmin = (statsdate, weight, musclemass, fatlevel, bmi, vv, percentwater) => {
    this.getStatsHistory();
    this.loadLastStat({statsdate, weight, musclemass, fatlevel, bmi, vv, percentwater});
    statHistoryArr.push({
      statsdate: statsdate,
      weight: weight,
      musclemass: musclemass,
      fatlevel: fatlevel,
      bmi: bmi,
      vv: vv,
      percentwater: percentwater,
      id: statHistoryArr.length-1});
  } 

  getStatsHistory = () => {
    const { email } = this.state.user;
    if(!this.state.loaded) {
      fetch('http://localhost:3001/getstats', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email
        })
      })
      .then(response => response.json())
      .then(s => {
        if(s.length > 0){
          s.forEach(e => {statHistoryArr.push(e)});
          this.loadLastStat(statHistoryArr[statHistoryArr.length-1]);
          //set state and put last element of array into state for display
        } else {
            //the stats history table is empty. What to do then?
            console.log(`stat history table is empty in getStatsHistory`);
            return false;
        }
      }).catch(err => {
        console.log('Get Stats History Error: ' + err);
    });
    }
    return true;
  }

//Training Session Information
  getTrainingHistory = () => {
    const { email } = this.state.user;
    const { packageId } = this.state.pack;
    fetch('http://localhost:3001/gettrainings', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          packageid: packageId
        })
      })
      .then(response => response.json())
      .then(train => {
        if(train){
          train.forEach(e => {trainingHistoryArr.push(e)});
          return true;
        } 
      }).catch(err => {
                  console.log('Get Training History Error: ' + err);
              });
       return true;
  } 

  //Tracks new sessions in an array (the session is also sent to the DB for persistant storage)
  addSession = (e) => {
      trainingHistoryArr.push(e);
    }

//Loads component to add a new client package for the trainer
  addPackage = (e) => {
    console.log(`addPackage: ${e.target.value}`)
      this.onRouteChange('packageInputForm');
    }

 //indicates if the history for stats and training sessions has been loaded from the DB
  historyLoaded= (value)=> {
    this.setState({loaded: value})
  }

  //clear the temp arrays when signing out
  clearArrays = (arr) => {
    if(arr.length > 0) {
      arr.length = 0;
    }
  }

  onTrainerSubmit = (e) => {
    console.log('admin submit'+ e.target.value );
    fetch('http://localhost:3001/trainergetclient', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: e.target.value,
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.loadUser(user);
				if(user.istrainer === true) {
			//	this.props.onRouteChange('trainer');
				} else {
					  this.onRouteChange('home');
				}
			}
		}).catch(err => {console.log(err)});
    //Load User information 
      //create new call to db that doesn't require password
      //push user info into state
      //load stats and package info using existing calls

    //Load modified "home" screen with user information
  }


// Custom routing based on the 'route' variable in state
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
      this.clearArrays(statHistoryArr);
      this.clearArrays(trainingHistoryArr);
    } else if (route === 'home' || route === 'stats') {
              this.setState({isSignedIn: true})
              } else if (route === 'trainer'){
                //this.setState(initialState);
                this.clearArrays(statHistoryArr);
                this.clearArrays(trainingHistoryArr);
                this.setState({isSignedIn: true});
                this.setState({user: [], pack: [], stats: [], loaded: false});
              }
    this.setState({route: route});
  }

  renderOption = (route) => {
    const { stats, pack, loaded, user } = this.state;
    const { fName, email, height, trainer } = this.state.user;
    const { packageId } = this.state.pack;
    const { isTrainer } = this.state.trainer;
    const { addSession, onRouteChange, loadUserPack, historyLoaded,
            getStatsHistory, getTrainingHistory, loadUser, clearArrays, loadTrainer, statAdmin,
            onTrainerSubmit } = this;
    
    if(route === 'home'){
      return <div> <Dashboard user={user} pack={pack} stats={stats} loaded = {loaded}
                              getTrainingHistory={getTrainingHistory}
                              getStatsHistory={getStatsHistory}
                              historyLoaded={historyLoaded}
                              loadUserPack={loadUserPack}
                              addSession={addSession}
                              onRouteChange={onRouteChange}
                              isTrainer={isTrainer} addPackage={this.addPackage}/></div> 
    }
    else if (route === 'stats'){
      return <div> <Stats statHistory={statHistoryArr} name={fName}/></div>
    }
    else if (route === 'signout'){
      return <div><Signin loadUser={ loadUser } onRouteChange={onRouteChange} 
                           clearArrays={clearArrays} loadTrainer={loadTrainer}  /></div>
    }
    else if (route === 'register'){
      return <div><Register loadUser={ loadUser } onRouteChange={onRouteChange} /></div>
    }
    else if (route === 'trainingHistory'){
      return <div><TrainingHistory packageId={packageId} trainingHistoryArr={trainingHistoryArr} email={email} name={fName} getTrainingHistory={getTrainingHistory}/></div>
    }
    else if (route === 'statsInputForm'){
      return <div><StatsInputForm name={fName}  email={email}
                                  height={height} onRouteChange={onRouteChange}
                                  statAdmin={statAdmin}/></div>
    }   
    else if (route === 'trainer'){
      return <div><Trainer history={allUserHistoryArr} onTrainerSubmit={onTrainerSubmit} /></div>
    }
    else if (route === 'packageInputForm'){
      return <div><PackageInputForm email={email} fName={fName} completed={this.state.pack.completed}/></div>
    }   
    else if (route === 'help') {
      return <div><Help /></div>
    }
    else if (route === 'trainerinfo') {
      return <div><TrainerInfo trainer={trainer}/></div>
    }
  }

  render() {
    const {isSignedIn, route} = this.state;
    const { isTrainer } = this.state.user;
    const { loadUser, loadTrainer, onRouteChange, clearArrays, renderOption } = this;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} isTrainer={isTrainer} />
        {(route !== 'signin' ? renderOption(route)
        : 
            route === 'signin'
            ? <Signin loadUser={loadUser}  onRouteChange={onRouteChange} clearArrays={clearArrays} loadTrainer={loadTrainer} />
            : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
