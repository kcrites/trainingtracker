import React from 'react';
import boat from './boat.png';

const Navigation = (onRouteChange) => {
	return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<img className='ma4 mt0 br2' style={{marginRight: 'auto', height: '60px', justifyContent: 'flex-start', paddingTop: '10px'}} alt='Logo' src={boat} />
			<p onClick={onRouteChange} className='f4 link dim black underline pa3 pointer'>Sign Out</p>
		
		</nav>
		);
}

export default Navigation;