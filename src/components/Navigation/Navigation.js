import React from 'react';
import logo from './dmpt.jpg';


const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '60px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={logo} />
				<p onClick={() => onRouteChange('home')} className='f5 link dim black  pa3 pointer'>Home</p>
				<p onClick={() => onRouteChange('trainingHistory')} className='f5 link dim black  pa3 pointer'>Training History</p>
				<p onClick={() => onRouteChange('stats')} className='f5 link dim black  pa3 pointer'>User Stats</p>
				<p onClick={() => onRouteChange('statsInputForm')} className='f5 link dim black  pa3 pointer'>Enter Stats</p>
				<p onClick={() => onRouteChange('signout')} className='f5 link dim black pa3 pointer'>Sign Out</p>
				</nav>
			);
		} else {
				return(
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '60px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={logo} />
					<p onClick={() => onRouteChange('signin')} className='f5 link dim black  pa3 pointer'>Sign in</p>
					<p onClick={() => onRouteChange('register')} className='f5 link dim black  pa3 pointer'>Register</p>
				</nav>
				);
			}
	}


export default Navigation;
