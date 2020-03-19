import React from 'react';
import './Footer.css';

const Footer = ({onRouteChange, isAdmin}) => {
	return(
			<nav className='footer-size' style={{display: 'flex', justifyContent: 'center'}}>
				{(isAdmin ? <p onClick={() => onRouteChange('trainer')} className='f5 link dim black pa3 pointer'>Client List -</p>
				: ''
					)}
				<p onClick={() => onRouteChange('trainerinfo')} className='f5 link dim black  pa1 pointer'>Trainer Information -</p>
				<p onClick={() => onRouteChange('help')} className='f5 link dim black  pa1 pointer'>Help</p>
			</nav>
			);
	}
export default Footer;
