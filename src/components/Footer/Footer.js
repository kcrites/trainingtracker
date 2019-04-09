import React from 'react';
import './Footer.css';



const Footer = ({onRouteChange, isAdmin}) => {
	return(
			<nav style={{display: 'flex', justifyContent: 'center'}}>
				<p onClick={() => onRouteChange('home')} className='f5 link dim black  pa3 pointer'>Trainer Information</p>
				{(isAdmin ? <p onClick={() => onRouteChange('admin')} className='f5 link dim black pa3 pointer'>Administration</p>
				: ''
					)}
				<p onClick={() => onRouteChange('home')} className='f5 link dim black  pa3 pointer'>Help</p>
			</nav>
			);
	}
export default Footer;
