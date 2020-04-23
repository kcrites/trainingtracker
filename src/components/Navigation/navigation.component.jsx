import React from 'react';
import logo from '../Logo/dmpt.jpg';
import { auth } from '../../firebase/firebase.utils';

import './navigation.styles.scss';
const version = '2.x';

const Navigation = ({onRouteChange, isSignedIn, isTrainer, name, currentUser}) => {
	if(currentUser) {
		return(
			<nav className='header'>
			<div className='logo-container'>
            <img src = {logo} className='logo' alt="logo"/>
				
			</div>
				{(isTrainer) ? <span onClick={() => onRouteChange('trainer')} className='options'>Home</span>
				: <span onClick={() => onRouteChange('home')} className='options'>Home</span>}
				<span onClick={() => onRouteChange('trainingHistory')} className='options'>Training History</span>
				<span onClick={() => onRouteChange('stats')} className='options'>Measurement History</span>
				<span onClick={() => auth.signOut()}className='options'>Sign Out</span>
				</nav>
			);
		} else {
				return(
					<nav className='header'>
					<div className='logo-container'>
                    <img src = {logo} className='logo' alt="logo"/>
					</div>
					<span className='f5 pa2'>Personal Training Tracker v{version}</span>
				</nav>
				);
			}
	}


export default Navigation;
