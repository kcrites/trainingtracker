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
import PackageInputForm from './components/PackageInputForm/PackageInputForm';
import './App.css';


const trainingHistoryArr = [];
const statHistoryArr = [];
const allUserHistoryArr = [];
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
      newTrainingDate: '',
      route: 'signin',
      isSignedIn: false,
      statInput: '',
      user: {
        id: '',
        name: '',
        email: '',
        height: '',
        isAdmin: false, 
        joined: ''
      },
      package: 
      {
        dataStarted: undefined,
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


//Puts user information into state after signin
 loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        height: data.height,
        isAdmin: data.isAdmin,
        joined: data.joined
    }})
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

  
  packageAdmin = (session, email) => {
    const { packageId } = this.state.trainingPackage;
    if(packageId === '104'){
      //console.log(`Package Id: ${packageId}, data: ${session}`)
      trainingHistoryArr.push({user:email, packageId:packageId, sessionDate: session})
      //console.log(`trainingHistoryArr: ${trainingHistoryArr[trainingHistoryArr.length-1]}`)
    }
  }

//Stats (Measurements) Information ***MOVE THE ARGS INTO STATE IN THE COMPONENT
  statAdmin = (d, w, mm, fl, bmi, vv, pw) => {
   console.log(`statAdmin: ${d} ${w} ${mm} ${fl} ${bmi} ${vv} ${pw}`);
    statHistoryArr.push({statsdate: d, weight: w, musclemass: mm, fatlevel: fl, bmi: bmi, vv: vv, percentwater: pw});
    this.getStatsHistory();
  } 

  getStatsHistory = () => {
    console.log('getStatHistory function');
    fetch('http://localhost:3001/getstats', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.user.email
      })
    })
    .then(response => response.json())
    .then(pack => {
      if(pack){
        pack.forEach(e => {statHistoryArr.push(e)});
        console.log(`pack: ${pack}, statHistArr: ${statHistoryArr}`);
      }
    })
  }

//Training Session Information

  getTrainingHistory = () => {
    console.log('getTrainingHistory function');
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
        console.log(`train: ${train}, trainingHistArr: ${trainingHistoryArr}`);
      }
    })
  }

  showUser = (c) => {
    console.log(this.state.user.name, this.state.trainingPackage.sessionCount,
      this.state.trainingPackage.packageId, this.state.trainingPackage.completed,
      this.state.trainingPackage.dateStarted, this.state.newTrainingDate, 'c:', c);
        //console.log(this.state);
  }

  onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    
    const { completed, maxSessions } = this.state.trainingPackage;
    
    let c = this.state.trainingPackage.sessionCount;
    let l = this.state.trainingPackage.sessionsLeft;
    if(this.state.input !== '') {
        c++;
        l--;
  
        this.setState({newTrainingDate: this.state.input});
        this.packageAdmin(this.state.input, this.state.user.email);
        //setState is an asyc call, so might not be set immediatly
        if(!completed) {
    //this.showUser(c);
          this.setState(Object.assign(this.state.trainingPackage, {sessionCount: c, sessionsLeft: l}));
        }
        if(c >= maxSessions){
          this.setState(Object.assign(this.state.trainingPackage, {completed: true}));

        }
    }
  }


  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home' || route === 'stats') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  renderOption = (route) => {
    if(route === 'home'){
      return  <div>
                <PackageInfo name={this.state.user.name}
                  email={this.state.user.email}
                  completed={this.state.package.completed}
                  sessionCount={this.state.package.sessionCount}
                  sessionsLeft={this.state.package.sessionsLeft}
               //   sessionsUsed={this.state.package.sessionsUsed}
               //   maxSessions={this.state.package.maxSessions}
                  packageId={this.state.package.packageId}
                  dateStarted={this.state.package.dateStarted}
                  loadUserPack={this.loadUserPack}/>
                <TrainingInputForm email={this.state.user.email}
                  packageId={this.state.package.packageId}
                  packagedate={this.state.package.dateStarted}
                  onRouteChange={this.onRouteChange}/>
              </div>
    }
    else if (route === 'stats'){
      return <div> <Stats statHistory={statHistoryArr}/></div>
    }
    else if (route === 'signout'){
      return <div><Signin loadUser={ this.loadUser } onRouteChange={this.onRouteChange} /></div>
    }
    else if (route === 'register'){
      return <div><Register loadUser={ this.loadUser } onRouteChange={this.onRouteChange} /></div>
    }
    else if (route === 'trainingHistory'){
      return <div><TrainingHistory history={trainingHistoryArr} /></div>
    }
    else if (route === 'statsInputForm'){
      return <div><StatsInputForm name={this.state.user.name}  email={this.state.user.email}
                                  height={this.state.user.height} onRouteChange={this.onRouteChange}
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
            ? <Signin loadUser={this.loadUser} getStatsHistory={this.getStatsHistory} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          
            )
        }

       
      </div>
    );
  }
}

export default App;
