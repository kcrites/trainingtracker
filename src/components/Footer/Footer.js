import React from 'react';
import './Footer.css';



const Footer = ({onRouteChange, isAdmin}) => {
	return(
			<nav style={{display: 'flex', justifyContent: 'center'}}>
				<p onClick={() => onRouteChange('trainerinfo')} className='f5 link dim black  pa3 pointer'>Trainer Information</p>
				{(isAdmin ? <p onClick={() => onRouteChange('trainer')} className='f5 link dim black pa3 pointer'>Client List</p>
				: ''
					)}
				<p onClick={() => onRouteChange('help')} className='f5 link dim black  pa3 pointer'>Help</p>
			</nav>
			);
	}
export default Footer;
