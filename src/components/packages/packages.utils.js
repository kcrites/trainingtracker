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
                      //(LOAD TO REDUX STORE)
                     // console.log('pack:' + pack);
                      if(pack.id){
                        storeInState(pack, 'pack');
                      } else console.log('no package info')
              })
            }catch(error) {
              console.log('Get Stats History Error: ', error);
            }
            return true;
          };