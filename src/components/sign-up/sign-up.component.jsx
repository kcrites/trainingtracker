import React from 'react';
import Popout from '../popout/popout.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
constructor(){
    super();
    this.state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        privacy: false,
        error: false,
        showPopup: false,
        isTrainer: false,
        isAdmin: false,
        trainer: 'Desire',
    }
}

handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, privacy, trainer } = this.state;

    if(password !== confirmPassword){
        alert("Password doesn't match");
        return;
    }
    if(!privacy){
        alert("Please accept the privacy statement");
        return;
    }
    try {
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
       
        await createUserProfileDocument(user, {displayName, privacy, trainer});

        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            
        })

    }catch (error) {
        console.error(error);
        return <div>Error Registering</div>
    }  
};

handleChange = (e) => {
const { name, value } = e.target;
this.setState({[name]: value });
}

handlePrivacyChange = (event) => {
	
    this.setState({privacy: event.target.checked});
    this.setState({error: false});
}

togglePopup= ()=> {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return(
        <div className='sign-up'>
            <h2 className='title'>App User Registration</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='display name'
                    required
                    />
              
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='email'
                    required
                    />
               
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='password'
                    required
                    />
               
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='confirm password'
                    required
                    />
               
                    	<div className="mv3">
				       		<label className="db fw6 lh-copy f7 priv-label" htmlFor="privacy">Agree to the privacy policy for this application ->&nbsp; 
				       		    <input onChange={this.handlePrivacyChange}  type="checkbox" value="true" name="privacy"  id="privacy"/>
                                <span className="req">{' '}* required</span></label>
                <CustomButton onClick={this.togglePopup.bind(this)} isPrivacy>
                            {' '}Read Privacy Policy{' '}
                </CustomButton>
				      	</div>
						  <div>
						  {this.state.showPopup ? 
								<Popout
									text={'privacy'}
									closePopup={this.togglePopup}
								/>
								: null
								}
						  </div>
                <CustomButton type='submit'>Sign Up</CustomButton>
               
            </form>
        </div>
    )
}
}

export default SignUp;