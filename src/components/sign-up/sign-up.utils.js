import { serverURL } from '../../server-path';

export const saveUserToDB = (newUser) => {
    const { displayName, email, password, height, privacy } = newUser;
   
    let name = splitName(displayName);
        fetch(serverURL + 'register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fname: name[0],
                lname: name[1],
                email: email,
                password: password,
                height: height,
                privacy: privacy
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.email){
               return true;
            }
            else {return false;}
        }).catch(err => {
            console.log('Register Error: ' + err);
        });
  
    }

export const splitName = (displayName) => {
    let name = displayName.split(" ");
    if(name){
        return name;
    } else return [displayName,''];
}