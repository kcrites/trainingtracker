import React from 'react';
import logo from '../logo/dmpt.jpg';
import { auth } from '../../firebase/firebase.utils';

import './Navigation.css';
const version = '2.x';

const Navigation = ({onRouteChange, isSignedIn, isTrainer, name, currentUser}) => {
	if(currentUser) {
		return(
			<nav className='nav' style={{display: 'flex', justifyContent: 'space-between', height:'60px'}}>
				<div  style={{marginRight: 'auto', height: '50px', direction: 'row',flexWrap: 'nowrap',justifyContent: 'flex-start'}}>
					<img className='ma4 mt0' style={{ height: '55px', paddingTop: '5px'}} alt='Logo' src={logo} />
					 <p style={{marginLeft: '5px'}} className='mt2 mb0 fw2 f3 pa2'>{currentUser.displayName}</p> 
				</div>
				{(isTrainer) ? <p onClick={() => onRouteChange('trainer')} className='f5 link dim  pa2  pointer'>Home</p>
				: <p onClick={() => onRouteChange('home')} className='f5 link dim  pa2 pointer'>Home</p>}
				<p onClick={() => onRouteChange('trainingHistory')} className='f5 link dim   pa2 pointer'>Training History</p>
				<p onClick={() => onRouteChange('stats')} className='f5 link dim   pa2 pointer'>Measurement History</p>
				<p onClick={() => auth.signOut()}className='f5 link dim  pa2 pointer'>Sign Out</p>
				</nav>
			);
		} else {
				return(
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '60px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={logo} />
					<p className='f5 pa2'>Personal Training Tracker v{version}</p>
				</nav>
				);
			}
	}


export default Navigation;
