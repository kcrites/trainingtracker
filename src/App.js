import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import './App.css';


class App extends Component {
constructor() {
  super();
  this.state= {
    input: ''
  }
}

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <PackageInfo />
        <TrainingInputForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
       
      </div>
    );
  }
}

export default App;
