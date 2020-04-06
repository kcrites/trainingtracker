import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-up.styles.scss';

const SignInPage = () => (
    <div className='sign-in-and-up'>
        <SignIn />
        <SignUp />
    </div>
)

export default SignInPage;