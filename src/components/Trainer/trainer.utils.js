import { serverURL } from '../../server-path';

export const handleTrainerSubmit = (e) => {
    //console.log('admin submit'+ e.target.value );
    fetch(serverURL + 'trainergetclient', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: e.target.value,
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.loadUser(user);
				if(user.istrainer === true) {
			//	this.props.onRouteChange('trainer');
				} else {
					  this.onRouteChange('home');
				}
			}
        }).catch(err => {console.log(err)});
        return true;
  }
  // need to determine how to manage user information versus trainer user information