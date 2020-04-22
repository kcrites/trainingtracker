import React from 'react';
import Popout from '../Popout/Popout';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

let privacyPolicy = <div><h2>Privacy Policy</h2>
<p>Your privacy is important to us. It is Karve Software's policy to respect your privacy regarding any information we may collect from you across our website, <a href="http://karvesoftware.com">http://karvesoftware.com</a>, and other sites we own and operate.</p>
<p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
<p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
<p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
<p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
<p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
<p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
<p>This policy is effective as of 17 June 2019.</p>
</div>

class SignUp extends React.Component {
constructor(){
    super();
    this.state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        height: '',
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
    const { displayName, email, password, confirmPassword, height, privacy, isAdmin, isTrainer, trainer } = this.state;

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
    await createUserProfileDocument(user, {displayName, height, isAdmin, isTrainer, trainer});
    this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        height: ''
    })
    }catch (error) {
        console.error(error);
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

togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

render() {
    const { displayName, email, password, confirmPassword, height } = this.state;
    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
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
                <FormInput
                    type='text'
                    name='height'
                    value={height}
                    onChange={this.handleChange}
                    label='height'
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
									text={privacyPolicy}
									closePopup={this.togglePopup.bind(this)}
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