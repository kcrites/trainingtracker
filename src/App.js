import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Stats from './components/Stats/Stats';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import TrainingHistory from './components/TrainingHistory/TrainingHistory';
import './App.css';


const trainingHistory = [
   
       { user: 'ken@gmail.com',
        packageId: '10-11-I',
        sessionDate: '7-1-1970'
      },
      {
        user: 'ken@gmail.com',
        packageId: '10-11-I',
        sessionDate: '7-2-1970'
      },
      {user: 'ken@gmail.com',
        packageId: '10-11-I',
        sessionDate: '7-3-1970'}
  ];

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
        entries: 0,
        joined: ''
      },
      trainingPackage: {
        dataStarted: new Date(),
        packageId: '10-11-I',
        completed: false,
        sessionCount: 7,
        sessionsLeft: 4,
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

  showUser = (c) => {
    console.log(this.state.user.name, this.state.trainingPackage.sessionCount,
      this.state.trainingPackage.pacakgeId, this.state.trainingPackage.completed,
      this.state.trainingPackage.dateStarted, this.state.newTrainingDate, 'c:', c);
        console.log(this.state);
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
    console.log(`input: ${this.state.input}`);
        this.setState({newTrainingDate: this.state.input});
        //setState is an asyc call, so might not be set immediatly
        if(!completed) {
          this.showUser(c);
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
      return <div> <Stats onRouteChange={this.onRouteChange}/></div>
    }
    else if (route === 'signout'){
      return <div><Signin loadUser={ this.loadUser } onRouteChange={this.onRouteChange} /></div>
    }
    else if (route === 'register'){
      return <div><Register loadUser={ this.loadUser } onRouteChange={this.onRouteChange} /></div>
    }
    else if (route === 'trainingPackage'){
      return <div><TrainingHistory history1={trainingHistory[0]} history2={trainingHistory[1]} history3={trainingHistory[2]}  /></div>
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
