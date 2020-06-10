import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

const ErrorPage = () => {
    return (
    <div>
        <span className='sign-in-error'>Error signing in. Please try again or register if you don't have an account.</span>
        <span className='sign-in-error'>Reset Password <span onClick=''>Here</span></span> 
     </div>
    )
}

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            error: false
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        }catch (error){
            console.log(error);
           // alert("Error signing in");
           this.setState({error: true});
            return;
        }
        if(this.state.email.length > 1){
            }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>PT Tracker Sign In</h2>
                <span>Sign in with your email and password</span>
                {(this.state.error) 
                ? <span className='sign-in-error'>Error signing in. Please try again or register if you don't have an account. Reset Password Here</span> 
                : null}
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required />
                   
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required />
                    <div className='buttons'>
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}Sign in with Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;