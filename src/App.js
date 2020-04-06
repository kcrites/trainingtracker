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
import Workout from './components/Workout/Workout';
import './App.css';
import ArrowImage from './components/Stats/ArrowImage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SignIn from './pages/sign-in-up/sign-in-up.component';
import LoadingPage from '../src/pages/loading-page/loading-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//import 'bootstrap/dist/css/bootstrap.min.css';

const serverURL = 'http://localhost:3005/';
//const serverURL = 'https://ttrackerserver-ams.herokuapp.com/';

const trainingHistoryArr = [];
const statHistoryArr = [];
const allUserHistoryArr = []; //For Trainer Panel
const fixDate = (olddate) => {
      let d = new Date(olddate);
      let newdate = d.toLocaleDateString();
      return newdate;
}

const initialState = {
  
    input: '',     
    route: 'start',
    isSignedIn: false,
    loaded: false,  
    trainingDateSelected: '', 
    dbAwake: false,
    trainingPackage: [],
    trainingHistory: [],
    currentUser: null,
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
      maxSessions: 0,
      newUser: false
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
    },
    indicator :
    {
      weight: null,
      musclemass: null,
      bmi: null,
      fatlevel : null,
      percentwater : null,
      vv : null

    }
  }


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
   
  }
  
  unsubscribeFromAuth = null;

  componentWillMount(){
    fetch(serverURL, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
     if(response.length < 1){
       console.log('Error waking the DB');
     } else this.setState({dbAwake: true});
      
   }).catch(err => {console.log(err)});
   //Method to store user information after signin into state as currentUser
   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        
        this.setState({
          currentUser: {
            id: snapShot.id,
          ...snapShot.data()
          }
          
        });
      });
    }
    else (this.setState({currentUser: userAuth}));
  });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
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

  emptyPackage = (data) => {
    this.setState({
      pack: {
        newUser: data,
        packageId: 0,
        completed: true,
        dateStarted: null,
      }});
  }
  
// Stats (Measurements) Information ***MOVE THE ARGS INTO STATE IN THE COMPONENT
// Called when a new set of measurements/statistics are entered
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
      fetch(serverURL + 'getstats', {
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
          this.loadLastStat(statHistoryArr[0]);
          this.statIndicator(statHistoryArr);
          //set state and put first element of array into state for display (last entry)
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
    fetch(serverURL + 'gettrainings', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email
        })
      })
      .then(response => response.json())
      .then(train => {
        if(train){
          train.forEach(e => {trainingHistoryArr.push(e)});
          const result = trainingHistoryArr.filter(id => id.packageid === parseInt(this.state.pack.packageId));
          this.setState({trainingPackage : [...result], trainingHistory: trainingHistoryArr});
          return true;
        } 
      }).catch(err => {
                  console.log('Get Training History Error: ' + err);
              });
       return true;
  } 

  //Tracks new sessions in an array (the session is also sent to the DB for persistant storage)
  addSession = (e) => {
    console.log('call to addSession');
      trainingHistoryArr.unshift(e);
      this.setState(state => {
        const trainingPackage = [e, ...state.trainingPackage];
        //console.table(trainingPackage)
        return {
          trainingPackage
          
        };
      });
    
    }

//Loads component to add a new client package for the trainer
  addPackage = (e) => {
      this.onRouteChange('packageInputForm');
    }


 //Puts the workout date selected into State. Called from TrainingInputForm.
  workoutDate = (d) => {
    this.setState({trainingDateSelected: d});
  }

 //indicates if the history for stats and training sessions has been loaded from the DB
  historyLoaded = (value) => {
    this.setState({loaded: value})
  }

  // Provides images to indicate if the current stats are more, less, or equal to the previous 
  // measurements. This is called when the user is logging in so that the indicators are stored in state.
  statIndicator = (array) => {
  //  let x = array.length; 
    let results = [];

   results[0] = this.checkStats(array[0].weight, array[1].weight, false);
   results[1] = this.checkStats(array[0].musclemass, array[1].musclemass, true);
   results[2] = this.checkStats(array[0].fatlevel, array[1].fatlevel, false);
   results[3] = this.checkStats(array[0].bmi, array[1].bmi, false);
   results[4] = this.checkStats(array[0].vv, array[1].vv, false);
   results[5] = this.checkStats(array[0].percentwater, array[1].percentwater, true);
  
    this.setState({indicator:{
      weight : results[0],
      musclemass : results[1],
      fatlevel : results[2],
      bmi : results[3],
      vv : results[4],
      percentwater : results[5],
     }});
    
 }
 
 // Logic to determine if current stat is more, less or equal to the previous stat
 checkStats = (newStat, lastStat, arrowMeaning) => {
    newStat = parseFloat(newStat);
    lastStat = parseFloat(lastStat);
  
    if(newStat > lastStat) {
      //"up";
      return arrowMeaning ? <ArrowImage arrow="upgreen"/> : <ArrowImage arrow="upred"/>
    } else if(newStat === lastStat){
      //'equal';
      return <ArrowImage arrow="equal"/> 
    } else if(newStat < lastStat){
      // "down";
      return arrowMeaning ? <ArrowImage arrow="downred"/>  : <ArrowImage arrow="downgreen"/> 
    } else return " ";
   
  }

  //clear the temp arrays when signing out
  clearArrays = (arr) => {
    if(arr.length > 0) {
      arr.length = 0;
    }
  }

  handleTrainerSubmit = (e) => {
    //console.log('admin submit'+ e.target.value );
    fetch(serverURL + 'trainergetclient', {
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
                this.clearArrays(statHistoryArr);
                this.clearArrays(trainingHistoryArr);
                this.setState({isSignedIn: true});
                this.setState({user: [], pack: [], stats: [], loaded: false});
              }
    this.setState({route: route});
  }

  renderOption = (route) => {
    const { stats, pack, loaded, user, indicator, dbAwake, trainingPackage } = this.state;
    const { fName, email, height, trainer } = this.state.user;
    const { packageId, completed, newUser } = this.state.pack;
    const { isTrainer } = this.state.trainer;
    const { addSession, onRouteChange, loadUserPack, historyLoaded,
            getStatsHistory, getTrainingHistory, loadUser, clearArrays, loadTrainer, statAdmin,
            handleTrainerSubmit } = this;
    
    if(route === 'home'){
      return <div> <Dashboard user={user} pack={pack} stats={stats} loaded = {loaded}
                              getTrainingHistory={getTrainingHistory}
                              packageArr={trainingHistoryArr}
                              trainingPackageArr={trainingPackage}
                              getStatsHistory={getStatsHistory}
                              historyLoaded={historyLoaded}
                              loadUserPack={loadUserPack}
                              workoutDate={this.workoutDate}
                              trainingDateSelected={this.state.trainingDateSelected}
                              addSession={addSession}
                              serverURL={serverURL}
                              onRouteChange={onRouteChange} emptyPackage={this.emptyPackage}
                              isTrainer={isTrainer} addPackage={this.addPackage}/></div> 
    }
    else if (route === 'stats'){
      return <div> <Stats statHistory={statHistoryArr} name={fName} indicator={indicator}/></div>
    }
    else if (route === 'signout'){
      return <div><Signin loadUser={ loadUser } onRouteChange={onRouteChange} dbAwake={dbAwake}
                           clearArrays={clearArrays} serverURL={serverURL} loadTrainer={loadTrainer}  /></div>
    }
    else if (route === 'register'){
      return <div><Register loadUser={ loadUser } serverURL={serverURL} onRouteChange={onRouteChange} /></div>
    }
    else if (route === 'trainingHistory'){
      return <div><TrainingHistory packageId={packageId} trainingHistoryArr={trainingHistoryArr}
                                  email={email} name={fName} getTrainingHistory={getTrainingHistory}/></div>
    }
    else if (route === 'statsInputForm'){
      return <div><StatsInputForm name={fName}  email={email} serverURL={serverURL}
                                  height={height} onRouteChange={onRouteChange}
                                  statAdmin={statAdmin}/></div>
    }   
    else if (route === 'trainer'){
      return <div><Trainer history={allUserHistoryArr} handleTrainerSubmit={handleTrainerSubmit}
                                  serverURL={serverURL} /></div>
    }
    else if (route === 'packageInputForm'){
      return <div><PackageInputForm email={email} fName={fName} completed={completed} packageId={packageId}
                                    serverURL={serverURL} newUser={newUser}/></div>
    }   
    else if (route === 'help') {
      return <div><Help /></div>
    }
    else if (route === 'trainerinfo') {
      return <div><TrainerInfo trainer={trainer}/></div>
    }
    else if(route === 'workout'){
      return <div><Workout trainingDateSelected={this.state.trainingDateSelected} email={email} 
                            fName={fName} onRouteChange={onRouteChange} serverURL={serverURL}/></div>
    }
    else if(route === 'signin'){
      return <div><SignIn /></div>
    }

  }

  render() {
    const {isSignedIn, route, dbAwake} = this.state;
    const { isTrainer, fName } = this.state.user;
    const { loadUser, loadTrainer, onRouteChange, clearArrays, renderOption } = this;
    return (
      <div className="App">
        <Navigation currentUser={this.state.currentUser} isSignedIn={isSignedIn} onRouteChange={onRouteChange} isTrainer={isTrainer} name={fName} />
        {(route !== 'start' ? renderOption(route)
        : 
            route === 'start'
            ? <LoadingPage dbAwake={dbAwake} onRouteChange={onRouteChange}/>//<SignIn />//<Signin loadUser={loadUser} dbAwake={dbAwake} onRouteChange={onRouteChange} clearArrays={clearArrays} serverURL={serverURL} loadTrainer={loadTrainer}/>
            : <SignIn />//<Register loadUser={loadUser} serverURL={serverURL} onRouteChange={onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
