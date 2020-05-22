import React from 'react';
import { ReactComponent as Logo } from '../logo/dmpt.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import './navigation.styles.scss';
const version = '2.x';

const Navigation = ({onRouteChange, currentUser}) => {
	if(currentUser) {
		return(
			<nav className='app-header'>
			<div className='logo-container'>
				<Logo className='app-logo' />
				<span className='option option-name'>{currentUser.displayName}</span>
			</div>
			<div className='options'>
				<span onClick={() => onRouteChange(`${currentUser.isTrainer ? 'trainer' : 'home'}`)} className='option'>Home</span>
				<span onClick={() => onRouteChange('trainingHistory')} className='option'>Training</span>
				<span onClick={() => onRouteChange('stats')} className='option'>Measurements</span>
				<span onClick={() => auth.signOut()}className='option'>Sign Out</span>
				</div>
			</nav>
			);
		} else {
				return(
					<nav className='app-header'>
					<div className='logo-container'>
                    <Logo className='app-logo' alt="logo"/>
					</div>
					<div className='options'>
						<span className='option'>Personal Training Tracker v{version}</span>
					</div>
				</nav>
				);
			}
	};


const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Navigation);
