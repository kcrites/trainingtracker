import { serverURL } from '../../server-path';

export const getTrainingHistory =  (email, storeInState) => {
    const tempHistoryArr = [];
   
     fetch(serverURL + 'gettrainings', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email
          })
        })
        .then(response => response.json())
        .then(train => {
          if(train !== 'User training sessions not found'){
            train.forEach(e => {
              tempHistoryArr.push(e);
            });
           
            storeInState(train, 'training');
          } 
        }).catch(err => {
                    console.log('Get Training History Error: ' + err);
                });
   
    
      return true;
  } 

  export const deleteTraining =  (id, packid, completedFlag) => {
    //check to see if package complete flag needs to be reset
    console.log(`in delete function: ${id} ${packid} ${completedFlag}`)
    
     fetch(serverURL + 'deletetraining', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id,
            packid: packid,
            completedFlag: completedFlag
          })
        })
        .then(response => response.json())
        .then(train => {
          if(train !== 'User training sessions not found'){
            //call refresh of data from DB
          } 
        }).catch(err => {
                    console.log('Error Deleting Training Session: ' + err);
                });
   
     
      return true;
  } 