import React from 'react';
import Privacy from './Privacy';
import './Register.css';

let errorCode = '';

let privacyPolicy = <div><h2>Privacy Policy</h2>
<p>Your privacy is important to us. It is Karve Software's policy to respect your privacy regarding any information we may collect from you across our website, <a href="http://bobsmyuncle.nl">http://bobsmyuncle.nl</a>, and other sites we own and operate.</p>
<p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
<p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
<p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
<p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
<p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
<p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
<p>This policy is effective as of 17 June 2019.</p>
</div>

class Register extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			fName: '',
			lName: '',
			height:'',
			privacy: false,
			error: false,
			showPopup: false,
			}
		}	

	componentWillMount() {
	
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	
	onFNameChange = (event) => {
		this.setState({fName: event.target.value})
	}

	onLNameChange = (event) => {
		this.setState({lName: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onHeightChange = (event) => {
		this.setState({height: event.target.value})
	}

	onPrivacyChange = (event) => {
	
		this.setState({privacy: event.target.checked});
		this.setState({error: false});
	}
	togglePopup() {
		this.setState({
		  showPopup: !this.state.showPopup
		});
	  }

	handleSubmitSignIn = () => {
		const { fName, lName, email, password, height, privacy } = this.state;
		if(privacy) {
			fetch('http://localhost:3001/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					fname: fName,
					lname: lName,
					email: email,
					password: password,
					height: height,
					privacy: privacy
				})
			})
			.then(response => response.json())
			.then(user => {
				if(user.email){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
				else {return <div>Error Registering</div>}
			}).catch(err => {
				console.log('Register Error: ' + err);
				this.setState({error: true});
			});
		} else {
			this.setState({error: true});
		}
		
	}

	render() {
		let errorMessage = 'Please check the Privacy checkbox';
		(this.state.error) ?  (errorCode = <div className='f7 red center'>Error Registering: {errorMessage}</div>) : errorCode = <div></div>
	return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				{errorCode}
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				        <div className="mt3">
				        	<label className="db fw6 lh-copy f6" htmlFor="FName">First Name</label>
				       		<input onChange={this.onFNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="fname"/>
				     	</div>
						 <div className="mt3">
				        	<label className="db fw6 lh-copy f6" htmlFor="lName">Last Name</label>
				       		<input onChange={this.onLNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="lname"/>
				     	</div>
				      	<div className="mt3">
				       		<label className="db fw6 lh-copy f6" htmlFor="height">Height</label>
				       		<input onChange={this.onHeightChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="height"  id="height"/>
				      	</div>
				      	<div className="mt3">
				        	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				       		<input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      	</div>
				      	<div className="mv3">
				       		<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				       		<input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      	</div>
						<div className="mv3">
				       		<label className="db fw6 lh-copy f7" htmlFor="privacy">By selecting here you agree to the privacy policy for this application ->&nbsp; 
				       		<input onChange={this.onPrivacyChange}  type="checkbox" value="true" name="privacy"  id="privacy"/></label>
							<br/><button onClick={this.togglePopup.bind(this)}>Read Privacy Policy</button>
				      	</div>
						  <div>
						  {this.state.showPopup ? 
								<Privacy
									text={privacyPolicy}
									closePopup={this.togglePopup.bind(this)}
								/>
								: null
								}
						  </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.handleSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;