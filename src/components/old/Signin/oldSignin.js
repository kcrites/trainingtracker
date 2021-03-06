import React from 'react';
import Loader from 'react-loader-spinner'

const version = '2.5';

class Signin extends React.Component { 
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	handleKeyPress = ({ key }) => {
		if (key === "Enter") {
		  this.handleSubmitSignIn();
		}
	  }

	handleSubmitSignIn = () => {
		const { loadTrainer, loadUser, onRouteChange, serverURL } = this.props;
		const { signInEmail, signInPassword } = this.state;
		fetch(serverURL + 'signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				if(user.istrainer === true) {
					loadTrainer(user); // LOAD TO A SUPER USER LEVEL??
					onRouteChange('trainer');
				} else {
						loadUser(user);
						onRouteChange('home');
				}
			}
		}).catch(err => {console.log(err)});
		
	}

	render() {
				const { onRouteChange, dbAwake } = this.props;
				return ( 
						<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
							<main className="pa4 black-80">
							  <div className="measure">
							    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
							      <div className="mt3">
							        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
							        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
							      </div>
							      <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							        <input onChange={this.onPasswordChange} onKeyDown={this.handleKeyPress} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
							      </div>
							     
							    </fieldset>
							    <div className="">
							      <input onClick={this.handleSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
							    </div>
							    <div className="lh-copy mt3">
							      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
							    </div>
							  </div>
							  <div className="center f6 fw2 flex items-center">version {version} {(dbAwake) ? '' : 
                                    <Loader
									type="ThreeDots"
									color="#00BFFF"
									height={16}
									width={30}
									timeout={0} //3 secs
						   
								 />}</div>
							</main>
						</article>
					);
			
		}
	}

export default Signin;