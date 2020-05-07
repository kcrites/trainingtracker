import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation.component';
import StatsInputForm from './components/StatsInputForm/StatsInputForm';
import Trainer from './components/Trainer/Trainer';
import PackageInputForm from './components/PackageInputForm/PackageInputForm';
import Help from './components/Help/Help';
import TrainerInfo from './components/TrainerInfo/TrainerInfo';
import History from './components/history/history.component';
import Dashboard from './components/Dashboard/Dashboard';
//import Workout from './components/Workout/Workout';
import { serverURL } from './server-path';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SignIn from './pages/sign-in-up/sign-in-up.component';
import LoadingPage from '../src/pages/loading-page/loading-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'

import './App.css';
import { resetMeasurements } from './redux/measurements/measurements.actions';
import { resetTraining } from './redux/training/training.actions';
import { resetPackage } from './redux/package/package.actions';
import { resetIndicator } from './redux/indicator/indicator.actions';

const initialState = {   
    route: 'start',
    loaded: false,  
    trainingDateSelected: '', 
    dbAwake: false,
  }


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  unsubscribeFromAuth = null;

  componentWillMount(){
      fetch(serverURL, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
      if(response.length < 1){
        console.log('Error waking the DB');
      } else this.setState({dbAwake: true});
        
    }).catch(err => {console.log(err)});
    //Method to store user information after signin into state as currentUser
   
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        console.log('App:');
        console.log(userAuth);
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          
          setCurrentUser({
            
              id: snapShot.id,
            ...snapShot.data()
          });
          if(this.props.currentUser.isTrainer) {
            this.onRouteChange('trainer')
          } else {
            this.onRouteChange('home');
          }
        });
      }
      else {
        setCurrentUser(userAuth);
        this.resetApp();
      };
      });
 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
    this.resetApp();
  }

  resetApp = () => {
    this.setState(initialState);

    this.setState({dbAwake: true})
    this.props.resetMeasurements();
    this.props.resetTraining();
    this.props.resetPackage();
    this.props.resetIndicator();

  }

  //clear the temp arrays when signing out
/*   clearArrays = (arr) => {
    if(arr.length > 0) {
      arr.length = 0;
    }
  } */

// Custom routing based on the 'route' variable in state
  onRouteChange = (route) => {
    this.setState({route: route});
  }

  renderOption = (route) => {
    console.log(`route: ${route}`)
    const { trainer } = this.props.currentUser;
    const { onRouteChange } = this;
    
    if(route === 'home'){
      return <div> <Dashboard  onRouteChange={onRouteChange} /></div> 
    }
    else if (route === 'stats'){ //converted to component
      return <div> <History  type='Measurements' /></div>
    }
    else if (route === 'trainingHistory'){ //converted to component
      return <div><History  type='Training'/></div>
    }
    else if (route === 'statsInputForm'){
      return <div><StatsInputForm onRouteChange={onRouteChange} /></div>
    }   
    else if (route === 'trainer'){
      return <div><Trainer onRouteChange={onRouteChange}/></div>
    }
    else if (route === 'packageInputForm'){
      return <div><PackageInputForm /></div>
    }   
    else if (route === 'help') {
      return <div><Help /></div>
    }
    else if (route === 'trainerinfo') {
      return <div><TrainerInfo trainer={trainer}/></div>
    }

    else if(route === 'signin'){
      return <div><SignIn /></div>
    }

  }

  render() {
    const { route, dbAwake} = this.state;
    const { currentUser } = this.props;
    const { onRouteChange, renderOption } = this;
 
    return (
      <div className="App">
        <Navigation onRouteChange={onRouteChange} />

      {(!currentUser )
      ? <LoadingPage dbAwake={dbAwake} onRouteChange={onRouteChange} />
      : renderOption(route)
      }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  resetMeasurements: stats => dispatch(resetMeasurements()),
  resetTraining: training => dispatch(resetTraining()),
  resetPackage: pack => dispatch(resetPackage()),
  resetIndicator: dash => dispatch(resetIndicator())
})

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
