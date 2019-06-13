import React from 'react';

let errorCode = '';

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
			error: false
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
				       		<label className="db fw6 lh-copy f7" htmlFor="privacy">By selecting here you agree to the privacy policy for this application</label>
				       		<input onChange={this.onPrivacyChange}  type="checkbox" value="true" name="privacy"  id="privacy"/>
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