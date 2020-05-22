import { serverURL } from '../../server-path';

//DELETE
export const handleTrainerSubmit = (e, setClientInState) => {
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
				console.log(user);
				setClientInState(user);
			} else return false;
        }).catch(err => {
			console.log(err);
			return false;
		});
        return true;
  };
  // need to determine how to manage user information versus trainer user information

  export const getTrainerDetails = (e) => {
    //console.log('admin submit'+ e.target.value );
    fetch(serverURL + 'trainergetdetails', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: e.target.value,
			})
		})
		.then(response => response.json())
		.then(details => {
			if(details.id){
				//send details to state
				} else {
					  console.log('No Trainer Details Available for ' + e);
				}
			}
        ).catch(err => {console.log(err)});
        return true;
  };