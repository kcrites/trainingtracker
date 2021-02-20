import React from 'react';
import { ReactComponent as Logo } from '../logo/dmpt.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './navigation.styles.scss';
const version = '2.75';

const Navigation = ({ currentUser }) => {
	if(currentUser) {
		return(
			<nav className='app-header'>
			<div className='logo-container'>
				<Logo className='app-logo' />
				<span className='option option-name'>{currentUser.displayName}</span>
			</div>
			<div className='options'>
				{(currentUser.isTrainer) 
					? <Link className='option' to='/trainer'>Home</Link>
					: <Link className='option' to='/home'>Home</Link>}
				<Link className='option' to='/traininghistory' >Training</Link>
				<Link className='option' to='/stats'>Measurements</Link>
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

export default withRouter(connect(mapStateToProps)(Navigation));
