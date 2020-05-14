import React from 'react';
import { connect } from 'react-redux';
import './footer.styles.scss';

const Footer = ({onRouteChange, isTrainer}) => {
	return(
			<nav className='footer-size' style={{display: 'flex', justifyContent: 'center'}}>
				{(isTrainer ? <p onClick={() => onRouteChange('trainer')} className='footer-text'>Client List -</p>
				: ''
					)}
				<p onClick={() => onRouteChange('trainerinfo')} className='footer-text'>Trainer Information -</p>
				<p onClick={() => onRouteChange('help')} className='footer-text'>Help</p>
				<p onClick={() => onRouteChange('infopage')} className='footer-text'>infopage</p>
			</nav>
			);
	}

const mapStateToProps = state => ({
		currentUser: state.user.currentUser
	});
export default connect(mapStateToProps)(Footer);
