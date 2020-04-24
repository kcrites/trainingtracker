import React from 'react';
import Loader from 'react-loader-spinner'
import SignIn from '../sign-in-up/sign-in-up.component';

import './loading-page.styles.scss';


const LoadingPage = ({ dbAwake, ...otherProps}) => (
       
            <div>
				   {(dbAwake) 
				   ? <SignIn {...otherProps}/> 
				   : 
					(<div className='centered-element'><h2>Loading Site </h2>   
						<Loader
							type="ThreeDots"
							color="#00BFFF"
							height={16}
							width={30}
							timeout={0} //3 secs
						/> </div>)}
            </div>
        
)

export default LoadingPage;