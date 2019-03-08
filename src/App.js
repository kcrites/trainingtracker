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
const allUserHistoryArr = [{
  number: '23',
  user: 'Ken',
  packageId: '101',
  date: '01-01-2000',
  sessionsLeft: 3,
  sessionsUsed: 7,
  action: 'false'

},
{
  number: '24',
  user: 'Jen',
  packageId: '100',
  date: '01-01-2000',
  sessionsLeft: 4,
  sessionsUsed: 7,
  action: 'false'

}];


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
        dataStarted: '',
        packageId: '',
        completed: false,
        sessionCount: 0,
        sessionsLeft: 0,
        maxSessions: 0
      },
      stats :
      {
        date: '',
        weight: 0.0,
        muscleMass: 0.0,
        fatLevel: 0.0,
        bmi: 0.0,
        vv: 0.0,
        percentWater: 0.0
      }
    }
  }


 loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        height: data.height,
        entries: data.entries,
        isAdmin: data.isAdmin,
        joined: data.joined
    }})
  }

   loadUserPack = (data) => {
    let sl = data.maxsessions - data.sessioncount;
    this.setState( {package: {

      dateStarted: data.datestarted,
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

  statAdmin = (d, w, mm, fl, bmi, vv, pw) => {
   console.log(`statAdmin: ${d} ${w} ${mm} ${fl} ${bmi} ${vv} ${pw}`);
    statHistoryArr.push({statsDate: d, weight: w, muscleMass: mm, fatLevel: fl, bmi: bmi, vv: vv, percentWater: pw});
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
        console.log(`pack: ${pack}, statHistArr: ${statHistoryArr}`)
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
                  sessionsUsed={this.state.package.sessionsUsed}
                  maxSessions={this.state.package.maxSessions}
                  packageId={this.state.package.packageId}
                  loadUserPack={this.loadUserPack}/>
                <TrainingInputForm email={this.state.user.email} packageId={this.state.package.packageId}
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
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          
            )
        }

       
      </div>
    );
  }
}

export default App;
