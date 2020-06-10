import React from 'react';
import { auth } from '../../firebase/firebase.utils';

  class PasswordReset extends React {
    constructor(){
        super();
        this.state = {
            email: ''
        }
    }

handleForm = (event) => {
    this.setState({email: event});
}

    handleSubmit =(event) => {
        event.preventDefault();
        if(!this.state.email) return;
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
            return(
            <div>Password email sent to {this.state.email}</div>
            )
          }).catch(function(error) {
            // An error happened.
          });
    }

    render(){
        return(
        <div>
            <span className="password-reset">Password Reset</span>
            <p>Email Address</p>
            <form>
                <input onChange={this.handleForm} type="text"></input>
                <button onClick={this.handleSubmit} >Reset</button>
            </form>
        </div>
         ) };
};

  export default PasswordReset;