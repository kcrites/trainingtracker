import React from 'react';
import { connect } from 'react-redux';
import './Footer.css';

const Footer = ({onRouteChange, isTrainer}) => {
	return(
			<nav className='footer-size' style={{display: 'flex', justifyContent: 'center'}}>
				{(isTrainer ? <p onClick={() => onRouteChange('trainer')} className='f5 link dim black pa3 pointer'>Client List -</p>
				: ''
					)}
				<p onClick={() => onRouteChange('trainerinfo')} className='f5 link dim black  pa1 pointer'>Trainer Information -</p>
				<p onClick={() => onRouteChange('help')} className='f5 link dim black  pa1 pointer'>Help</p>
			</nav>
			);
	}

const mapStateToProps = state => ({
		currentUser: state.user.currentUser
	});
export default connect(mapStateToProps)(Footer);
