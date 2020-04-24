import { serverURL } from '../../server-path';

export const getTrainingHistory = (email, storeInState) => {
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
        if(train){
          train.forEach(e => {tempHistoryArr.push(e)});
          storeInState(train, 'training');
        } 
      }).catch(err => {
                  console.log('Get Training History Error: ' + err);
              });
      return true;
  } 