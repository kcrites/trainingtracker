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
import { resetIndicator, setActiveName, setActiveEmail } from './redux/indicator/indicator.actions';
import { resetClient } from './redux/client/client.actions';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';


const initialState = {   
    dbAwake: false,
  }


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  unsubscribeFromAuth = null;

  async componentWillMount(){
    if(!this.state.dbAwake){
      await fetch(serverURL, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        
      if(response.status === 200){
        this.setState({dbAwake: true});
        //set dbawake in REDUX
      } else {
        console.log('Error waking the DB');
        alert('Error with the database');
        return;
      } 
        
     }).catch(err => {console.log(err)});
    }
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
            this.props.history.push("/trainer");
          } else {
            //set active name and email to current user values
            this.props.setActiveName(this.props.currentUser.displayName);
            this.props.setActiveEmail(this.props.currentUser.email);
            this.props.history.push("/home");
          }
        });
      }
      else {
       // this.props.history.push('/signin');
       if(this.state.dbAwake) {
          setCurrentUser(userAuth);
          this.resetApp();     }
          this.props.history.push('/signin');
      };
      });
    
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
    this.resetApp();
  }

  resetApp = () => {
    if(this.state.dbAwake) this.setState({dbAwake: true})
    this.props.resetMeasurements();
    this.props.resetTraining();
    this.props.resetPackage();
    this.props.resetIndicator();
    this.props.resetClient();
  }


  render() {
    const { dbAwake} = this.state;
    const { currentUser } = this.props;
    

    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path='/' 
            render={() => !currentUser ? (
              <LoadingPage dbAwake={dbAwake} />)
              : (
                <Redirect to='/home' />
              )
            }
            /> 
          <Route path='/home' component={Dashboard} />
          <Route path='/stats'><History type='Measurements' /></Route>
          <Route path='/traininghistory'><History type='Training' /></Route>
          <Route path='/statsinputform' component={StatsInputForm} />
          <Route path='/trainer' component={Trainer} />
          <Route path='/packageinputform' component={PackageInputForm} />
          <Route path='/help' component={Help} />
          <Route path='/signin' component={SignIn} />
          <Route path='/infopage' component={InfoPage} />
          <Route exact path='/popout1'><Popout text='faq' /></Route>
          <Route exact path='/popout2'><Popout text='tech' /></Route>
          <Route exact path='/popout3'><Popout text='terms' /></Route>
          <Route exact path='/popout4'><Popout text='privacy' /></Route>
        </Switch>
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
  resetClient: client => dispatch(resetClient()),
  setActiveName: activeName => dispatch(setActiveName(activeName)),
  setActiveEmail: activeEmail => dispatch(setActiveEmail(activeEmail))
})

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
