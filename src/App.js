import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import Signin from './components/Signin/Signin';
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

  onRouteChange = () => {
    this.setState({route: 'home'});
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange} />
        :
          <div>
            <PackageInfo />
            <TrainingInputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          </div>
       }
      </div>
    );
  }
}

export default App;
