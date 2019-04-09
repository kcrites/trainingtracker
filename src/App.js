import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Stats from './components/Stats/Stats';
import StatsInputForm from './components/StatsInputForm/StatsInputForm';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import TrainingHistory from './components/TrainingHistory/TrainingHistory';
import Admin from './components/Admin/Admin';
import Footer from './components/Footer/Footer';
import PackageInputForm from './components/PackageInputForm/PackageInputForm';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';


const trainingHistoryArr = [];
const statHistoryArr = [];
const allUserHistoryArr = []; //For Admin Panel
const fixDate = (olddate) => {
      
      let d = new Date(olddate);
      let newdate = d.toLocaleDateString();
      return newdate;
  
}

class App extends Component {
  constructor() {
    super();
    this.state= 
    {
      input: '',     
      route: 'signin',
      isSignedIn: false,
      loaded: false,   
      user: {
        id: '',
        name: '',
        email: '',
        height: '',
        isAdmin: false,
        isTrainer: false,
        trainer: '', 
        joined: ''
      },
      package: 
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
      }
    }
  }

//Load Data into State and Arrays
//Puts user information into state after signin
 loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
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
    console.log(data.d, data.statsdate)
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

//Training Package Information
  loadUserPack = (data) => {
    let sl = data.maxsessions - data.sessioncount;
    let fixed = fixDate(data.datestarted);
    this.setState( {
      package: {
        dateStarted: fixed,
        packageId: data.packageid,
        completed:data.completed,
        maxSessions:data.maxsessions,
        sessionsLeft:sl,
        sessionCount: data.sessioncount
    }})
  }
  
//Stats (Measurements) Information ***MOVE THE ARGS INTO STATE IN THE COMPONENT
  statAdmin = (statsdate, weight, musclemass, fatlevel, bmi, vv, percentwater) => {
    this.getStatsHistory();
    this.loadLastStat({statsdate, weight, musclemass, fatlevel, bmi, vv, percentwater}); //Loads last stat into State
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
    if(!this.state.loaded) {
      fetch('http://localhost:3001/getstats', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.user.email
        })
      })
      .then(response => response.json())
      .then(pack => {
        if(pack.length > 0){
          pack.forEach(e => {statHistoryArr.push(e)});
          this.loadLastStat(statHistoryArr[statHistoryArr.length-1]);
          //set state and put last element of array into state for display
        } else {
            //the stats history table is empty. What to do then?
            console.log(`stat history table is empty in getStatsHistory`);
        }
      }).catch(err => {console.log(err)});
    }
    return true;
  }

//Training Session Information

  getTrainingHistory = () => {

   fetch('http://localhost:3001/gettrainings', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.user.email,
        packageid: this.state.package.packageId
      })
    })
    .then(response => response.json())
    .then(train => {
      if(train){
        train.forEach(e => {trainingHistoryArr.push(e)});
      }
    }).catch(err => {console.log(err)});
      return true;
  } 

  //Tracks new sessions in an array (the session is also sent to the DB for persistant storage)
 addSession = (e) => {
    trainingHistoryArr.push(e);
  }

 //indicates if the history for stats and training sessions has been loaded from the DB
  historyLoaded= (value)=> {
    this.setState({loaded: value})
  }

  clearArrays = () => {
    //clear the arrays when signing out
    if(statHistoryArr.length > 0) {
      for(let i = statHistoryArr.length; i >0; i--){
        statHistoryArr.pop();
      }
    }
  }

  //Next two functions are for the training input form
  onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    
    const { completed, maxSessions, sessionCount, sessionsLeft } = this.state.trainingPackage;
    const { input, trainingPackage } = this.state;
    
    let c = sessionCount;
    let l = sessionsLeft;
    if(input !== '') {
        c++;
        l--;
  
        this.setState({newTrainingDate: input});
        this.packageAdmin(input, this.state.user.email);
        
        if(!completed) {
   
          this.setState(Object.assign(trainingPackage, {sessionCount: c, sessionsLeft: l}));
        }
        if(c >= maxSessions){
          this.setState(Object.assign(trainingPackage, {completed: true}));

        }
    }
  }

// Custom routing based on the 'route' variable in state
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false })
    } else if (route === 'home' || route === 'stats') {
              this.setState({isSignedIn: true})
              }
    this.setState({route: route});
  }

  renderOption = (route) => {
    const {date, weight, musclemass, fatlevel, bmi, vv, percentwater} = this.state.stats;
    const {name, email, height, isAdmin} = this.state.user;
    const { completed, sessionCount, sessionsLeft, dateStarted, packageId} = this.state.package;
    if(route === 'home'){
      return    <div className="wrapper">
                  <div className="box header headertitle">{name}</div>
                    <Sidebar date={date} weight={weight} 
                        musclemass={musclemass} fatlevel={fatlevel}
                        bmi={bmi} vv={vv} percentwater={percentwater} />
                    <div className="box content">
                      <PackageInfo name={name}
                        email={this.state.user.email}
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
    }
    else if (route === 'stats'){
      return <div> <Stats statHistory={statHistoryArr}/></div>
    }
    else if (route === 'signout'){
      return <div><Signin loadUser={ this.loadUser } onRouteChange={this.onRouteChange} 
                          isSignedIn={this.state.status} clearArrays={this.clearArrays} /></div>
    }
    else if (route === 'register'){
      return <div><Register loadUser={ this.loadUser } onRouteChange={this.onRouteChange} /></div>
    }
    else if (route === 'trainingHistory'){
      return <div><TrainingHistory packageId={packageId} trainingHistoryArr={trainingHistoryArr} email={email}  getTrainingHistory={this.getTrainingHistory}/></div>
    }
    else if (route === 'statsInputForm'){
      return <div><StatsInputForm name={name}  email={email}
                                  height={height} onRouteChange={this.onRouteChange}
                                  statAdmin={this.statAdmin}/></div>
    }   
    else if (route === 'admin'){
      return <div><Admin history={allUserHistoryArr}/></div>
    }
    else if (route === 'packageInputForm'){
      return <div><PackageInputForm onStatsInputChange={this.onStatsInputChange}  onStatsButtonSubmit={this.onStatsButtonSubmit}/></div>
    }   
  }

  render() {
    const {isSignedIn, route} = this.state;
    const { isAdmin } = this.state.user;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} isAdmin={isAdmin} />
        {(route !== 'signin' ? this.renderOption(route)
        : 
            route === 'signin'
            ? <Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange} clearArrays={this.clearArrays}  />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          
            )
        }

       
      </div>
    );
  }
}

export default App;
