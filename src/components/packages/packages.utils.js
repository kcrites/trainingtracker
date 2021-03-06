import { serverURL } from '../../server-path';

export const getPackageHistory = (email, storeInState) => {
    //Only returns active package (1 record)
    try{
            fetch(serverURL + 'getpackage', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      email: email
                    })
              })
              .then(response => response.json())
              .then(pack => {
                      if(pack.id){
                        pack.datestarted = new Date(pack.datestarted);
                        storeInState(pack, 'pack');
                        
                      } else console.log('No Package Information Available')
              })
            }catch(error) {
              console.log('Get Stats History Error: ', error);
            }
            return true;
          };

export const getPackageSessions = (array, packageid,storeInState) => {

if(array) {
  const result = array.filter(id => id.packageid === parseInt(packageid));
  
storeInState(result, 'packSession');
  return true;
}
return false;

}

export const sortTrainingList = (array) => {
  //sort array by date
  array.sort(function(a, b) {
    var dateA = new Date(a.release), dateB = new Date(b.release);
    return dateA - dateB;
});
}

/* export const getAllPackageHistory =  (email, storeInState) => {
   fetch(serverURL + 'getallpackages', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email
        })
      })
      .then(response => response.json())
      .then(pack => {
          if(pack[0]){
           
            pack.datestarted = new Date(pack.datestarted);
            storeInState(pack, 'allpack');
            
          } else console.log('No Package Information Available')
      }).catch(err => {
                  console.log('Get Packages History Error: ' + err);
              });
 
  
    return true;
} ; */

export const showSessionsByPackage = (allSessions) => {

allSessions.sort((a,b) => (a.packageid < b.packageid) ? 1 : (a.packageid === b.packageid) ? ((a.sessiondate < b.sessiondate) ? 1 : -1) : -1);
return allSessions;
};