import React from 'react';
import boat from './boat.png';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '60px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={boat} />
				<p onClick={() => onRouteChange('signout')} className='f4 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
			);
		} else {
				return(
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '60px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={boat} />
					<p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'>Sign in</p>
					<p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa3 pointer'>Register</p>
				</nav>
				);
			}
	}


export default Navigation;