import { serverURL } from '../../server-path';

export const getMeasurementsHistory = (email, storeInState) => {
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
            console.log(`No Measurements Information Available`);
        }
      })
    }catch(error) {
        console.log('Get Stats History Error: ', error);
        //Set default measurements??
      }
      return true;
    };

//Fix system date to normal format
    export const fixDate = (olddate) => {
      let d = new Date(olddate);
      let newdate = d.toLocaleDateString();
      return newdate;
}