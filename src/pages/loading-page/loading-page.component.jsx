import React from 'react';
import Loader from 'react-loader-spinner'
import SignIn from '../sign-in-up/sign-in-up.component';

import './loading-page.styles.scss';


const LoadingPage = ({ dbAwake, onRouteChange}) => (
       
            <div>
                   {(dbAwake) ? <SignIn /> : 
                               (<div>Loading Site    <Loader
									type="ThreeDots"
									color="#00BFFF"
									height={16}
									width={30}
									timeout={0} //3 secs
						   
								 /> </div>)}
            </div>
        
)

export default LoadingPage;