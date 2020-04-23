
// Provides images to indicate if the current stats are more, less, or equal to the previous 
// measurements. This is called when the user is logging in so that the indicators are stored in state.
export const statIndicator = (array) => {
//  let x = array.length; 
  let results = [];

 results[0] = this.checkStats(array[0].weight, array[1].weight, false);
 results[1] = this.checkStats(array[0].musclemass, array[1].musclemass, true);
 results[2] = this.checkStats(array[0].fatlevel, array[1].fatlevel, false);
 results[3] = this.checkStats(array[0].bmi, array[1].bmi, false);
 results[4] = this.checkStats(array[0].vv, array[1].vv, false);
 results[5] = this.checkStats(array[0].percentwater, array[1].percentwater, true);

  /* this.setState({indicator:{
    weight : results[0],
    musclemass : results[1],
    fatlevel : results[2],
    bmi : results[3],
    vv : results[4],
    percentwater : results[5],
   }}); */
  return results;
}

// Logic to determine if current stat is more, less or equal to the previous stat
export const checkStats = (newStat, lastStat, arrowMeaning) => {
  newStat = parseFloat(newStat);
  lastStat = parseFloat(lastStat);

  if(newStat > lastStat) {
    //"up";
    return arrowMeaning ? '<ArrowImage arrow="upgreen"/>' : '<ArrowImage arrow="upred"/>'
  } else if(newStat === lastStat){
    //'equal';
    return '<ArrowImage arrow="equal"/>' 
  } else if(newStat < lastStat){
    // "down";
    return arrowMeaning ? '<ArrowImage arrow="downred"/>'  : '<ArrowImage arrow="downgreen"/>'
  } else return " ";
 
}

export const getPackageHistory = (email,serverURL, storeInState) => {
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
                    //(LOAD TO REDUX STORE)
                    console.log('pack:' + pack);
                    if(pack.id){
                      storeInState(pack, 'pack');
                    } else console.log('no package info')
            })
          }catch(error) {
            console.log('Get Stats History Error: ', error);
          }
          return true;
        };

export const getMeasurementsHistory = (email, serverURL, storeInState) => {
  const tempHistoryArr = [];
    try{
      fetch(serverURL + 'getstats', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email
        })
      })
      .then(response => response.json())
      .then(s => {
        if(s.length > 0){
         s.forEach(e => {tempHistoryArr.push(e)});
         storeInState(s, 'stats');
        } else {
            //the stats history table is empty. What to do then?
            console.log(`stat history table is empty in getStatsHistory`);
        }
      })
    }catch(error) {
        console.log('Get Stats History Error: ', error);
      }
      return true;
    };


    export const getTrainingHistory = (email, serverURL, storeInState) => {
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