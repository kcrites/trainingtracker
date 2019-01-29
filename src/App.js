import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import PackageInfo from './components/PackageInfo/PackageInfo';
import TrainingInputForm from './components/TrainingInputForm/TrainingInputForm';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <PackageInfo />
        <TrainingInputForm />
       
      </div>
    );
  }
}

export default App;
