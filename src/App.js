import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Stats from './components/Stats/Stats';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import './App.css';


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
        joined: '',
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

  onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    
    this.setState({newTrainingDate: this.state.input});
    //setState is an asyc call, so might not be set immediatly
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
                <PackageInfo />
                <TrainingInputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              </div>
    }
    else if (route === 'stats'){
      return <div> <Stats onRouteChange={this.onRouteChange}/></div>
    }
    else if (route === 'signout'){
      return <div><Signin onRouteChange={this.onRouteChange} /></div>
    }
    else if (route === 'register'){
      return <div><Register loadUser={ this.loadUser } onRouteChange={this.onRouteChange} /></div>
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
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          
            )
        }

       
      </div>
    );
  }
}

export default App;
