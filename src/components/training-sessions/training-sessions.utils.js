import { serverURL } from '../../server-path';
import { showSessionsByPackage } from '../packages/packages.utils';

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
            let tempArray = [...train];
            storeInState(showSessionsByPackage(tempArray), 'sessionsbypack');
            let tempSelfArray = filterTrainingList(train, 'onlyself');
            let tempNoSelfArray = filterTrainingList(train, 'nonself');
            storeInState(tempSelfArray, 'trainingonlyself');
            storeInState(tempNoSelfArray, 'trainingnoself');
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
                    return false;
                });
   
     
      return true;
  } 
//Not implemented yet
  export const addTrainingSession = (sessionObj, storeInState) => {
    const { sessionDate, activeEmail, pId, packageDate, selfTraining} = sessionObj;
    let id = -1;
    fetch(serverURL + 'addtraining', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				sessiondate: sessionDate,
				email: activeEmail,
				packageid: pId,
				packagedate: packageDate
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.id){
				id = data.id;		
					let newSession = {
						id: id,
						sessiondate: sessionDate,
						email: activeEmail,
						packageid: pId,
						packagedate: packageDate
					}
			if(!selfTraining){
				updatePackage(activeEmail, pId);
			}
			storeInState(newSession);
			this.props.history.push('/traininghistory');
			}
		}).catch(err => {console.log(err)});
  };

  const addDescriptions = (email, sessionid, newDesc) => {
    //add description to the DB

  }

  const updateDescription = (email, sessionid, newDesc) => {
    //update description
  };

  const getDescriptions = (email) => {
    //get all user's description
  }

  const updatePackage = (email, packageid) => {
	
			fetch(serverURL + 'updatepackage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				packageid: packageid,
			})
		})
		.then(response => response.json())
		.then(packUpdate => {
			if(packUpdate){
				this.props.addPackage(packUpdate);
			}
		}).catch(err => {console.log(err)});
	};

  const filterTrainingList = (array, action) => {

      //filter array based on action
  
        if(action === 'onlyself'){
          return array.filter(session => session.packageid  === 0);
        
        } else return  array.filter(session => session.packageid !== 0);
        };
