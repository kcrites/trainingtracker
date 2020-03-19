import React from 'react';
import logo from '../Logo/dmpt.jpg';
import './Navigation.css';


const Navigation = ({onRouteChange, isSignedIn, isTrainer, name}) => {
	if(isSignedIn) {
		return(
			<nav className='nav' style={{display: 'flex', justifyContent: 'space-between', height:'60px'}}>
				<div  style={{marginRight: 'auto', height: '50px', justifyContent: 'flex-start'}}>
					<img className='ma4 mt0 br2' style={{ height: '40px', paddingTop: '10px' ,paddingBottom: '10px'}} alt='Logo' src={logo} />
					{/* <h2 style={{marginLeft: '5px'}} className='mt2 mb0 fw2 f3 pa2'>{name}</h2> */}
				</div>
				{(isTrainer) ? <p onClick={() => onRouteChange('trainer')} className='f5 link dim black pa2  pointer'>Home</p>
				: <p onClick={() => onRouteChange('home')} className='f5 link dim black pa2 pointer'>Home</p>}
				<p onClick={() => onRouteChange('trainingHistory')} className='f5 link dim black  pa2 pointer'>Training History</p>
				<p onClick={() => onRouteChange('stats')} className='f5 link dim black  pa2 pointer'>Measurement History</p>
				{/* <p onClick={() => onRouteChange('statsInputForm')} className='f5 link dim black  pa2 pointer'>Enter Stats</p> */}
				<p onClick={() => onRouteChange('signout')} className='f5 link dim black pa2 pointer'>Sign Out</p>
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
