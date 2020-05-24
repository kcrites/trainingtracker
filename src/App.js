import React, { Component } from 'react';
import Navigation from './components/navigation/navigation.component';
import StatsInputForm from './components/stats-input-form/statsinputform.component';
import Trainer from './components/trainer/trainer.component';
import PackageInputForm from './components/package-input/package-input.component';
import Help from './components/help/help.component';
import History from './components/history/history.component';
import Dashboard from './components/Dashboard/Dashboard';
import InfoPage from './pages/info-page/info-page.component';
import Popout from './components/popout/popout.component';

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
import { resetClient } from './redux/client/client.actions';


const initialState = {   
    route: 'start',
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
        
      if(response.status === 200){
        this.setState({dbAwake: true});
      } else {
        console.log('Error waking the DB');
        alert('Error with the database');
        return;
      } 
        
    }).catch(err => {console.log(err)});
    //Method to store user information after signin into state as currentUser
   
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
      
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
    if(this.state.dbAwake) this.setState({dbAwake: true})
    this.setState({route: 'start'});
    this.props.resetMeasurements();
    this.props.resetTraining();
    this.props.resetPackage();
    this.props.resetIndicator();
    this.props.resetClient();
  }

// Custom routing based on the 'route' variable in state
  onRouteChange = (route) => {
    this.setState({route: route});
  }

  renderOption = (route) => {
   // console.log(`route: ${route}`)
  
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
      return <div><Help onRouteChange={onRouteChange}/></div>
    }
    else if(route === 'signin'){
      return <div><SignIn /></div>
    }
    else if(route === 'infopage'){
      return <div><InfoPage onRouteChange={onRouteChange}/></div>
    }
    else if(route === 'popout1'){
      return <div><Popout onRouteChange={onRouteChange} text={'faq'}/></div>
    }
    else if(route === 'popout2'){
      return <div><Popout onRouteChange={onRouteChange} text={'tech'}/></div>
    }
    else if(route === 'popout3'){
      return <div><Popout onRouteChange={onRouteChange} text={'terms'}/></div>
    }
    else if(route === 'popout4'){
      return <div><Popout onRouteChange={onRouteChange} text={'privacy'}/></div>
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
  resetIndicator: dash => dispatch(resetIndicator()),
  resetClient: client => dispatch(resetClient())
})

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
