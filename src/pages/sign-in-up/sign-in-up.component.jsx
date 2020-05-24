import React, {useState} from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-up.styles.scss';
//const selectedState = true;

const SignInPage = () => {
const [selectedState, setSelectedState] = useState(true);
    return (
        <div>
            <div className='sign-in-and-up'>
                {(selectedState)
            ? <SignIn />
            : <SignUp />
                }
                </div>
            <div className='sign-in-up-link'>
                <span className='sign-in-up-text' onClick={() => setSelectedState(!selectedState)}>
                    {(selectedState) ? 'Sign Up':'Sign In'}
                </span>
            </div>
        </div>
        )};

export default SignInPage;