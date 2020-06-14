import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './footer.styles.scss';

const Footer = (props) => {
	return(
			<nav className='footer-size' style={{display: 'flex', justifyContent: 'center'}}>
				{(props.currentUser.isTrainer ? <p onClick={() => props.history.push('/trainer')} className='footer-text'>Client List -</p>
				: ''
					)}
				<p onClick={() => props.history.push('/infopage')} className='footer-text'>Trainer Information</p>
				<p className='footer-text'>-</p>
				<p onClick={() => props.history.push('/help')} className='footer-text'>Help</p>
			</nav>
			);
	}

const mapStateToProps = state => ({
		currentUser: state.user.currentUser
	});
export default withRouter(connect(mapStateToProps)(Footer));
