import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  render() {
    const {isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
        ? <div>
            <PackageInfo />
            <TrainingInputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          </div>
        : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )

       }
      </div>
    );
  }
}

export default App;
