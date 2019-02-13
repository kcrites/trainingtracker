import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Stats from './components/Stats/Stats';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import TrainingHistory from './components/TrainingHistory/TrainingHistory';
import './App.css';


const trainingHistoryArr = [];
const statHistoryArr = [{
  weight: 93.4,
  date: '02/27/2019',
  muscleMass: 16,
  fatLevel: 13,
  bmi: 30.1,
  vv: 14,
  percentWater: 30
},
{
  weight: 94.4,
  date: '03/01/2019',
  muscleMass: 16.1,
  fatLevel: 13.2,
  bmi: 30.4,
  vv: 14,
  percentWater: 31
}];

class App extends Component {
  constructor() {
    super();
    this.state= {
      input: '',
      newTrainingDate: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        joined: ''
      },
      trainingPackage: {
        dataStarted: new Date(),
        packageId: '104',
        completed: false,
        sessionCount: 0,
        sessionsLeft: 11,
        maxSessions: 11
      }
    }
  }


 loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
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
    
    const { completed, packageId, maxSessions } = this.state.trainingPackage;
    
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
                  used={this.state.trainingPackage.sessionCount}
                  left={this.state.trainingPackage.sessionsLeft}
                  type={this.state.trainingPackage.packageId}
                  completed={this.state.trainingPackage.completed}/>
                <TrainingInputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
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
  }

  render() {
    const {isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {(route !== 'signin' ? this.renderOption(route)
          /*route === 'home'
          ? 
         <div>
            <PackageInfo />
            <TrainingInputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <Stats />
          </div> */
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
