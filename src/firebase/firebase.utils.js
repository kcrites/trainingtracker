import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { saveUserToDB } from '../components/sign-up/sign-up.utils';
//import 'firebase/database';

const config = {
    apiKey: "AIzaSyDaQ26ZGK34rZzRWGhHlsRw389rBkeCv9I",
    authDomain: "pt-tracker-50393.firebaseapp.com",
    databaseURL: "https://pt-tracker-50393.firebaseio.com",
    projectId: "pt-tracker-50393",
    storageBucket: "pt-tracker-50393.appspot.com",
    messagingSenderId: "493345142442",
    appId: "1:493345142442:web:d886b472d335ce0083c2d3",
    measurementId: "G-4MDFJDG948"
  };

  const userData =  {    
  height: 0,
  isTrainer: false,
  isAdmin: false,
  trainer: 'Desire',
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        //If snapshot doesn't exist, create user in DB with this data
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...userData
            })
        }catch(error) {
            console.log('error creating user', error.message);
        }
        //add user to postgres db
        saveUserToDB(userAuth);
    }
    return userRef;
  };

/*             export const displayUsers = async () => {
                const userList = fireBase.ref("users").orderByKey();
                   userList.once("value")
                 .then(function(snapshot) {
                     snapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();
                    });
                });
                console.table(userList)
            }; */

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
 // export const fireBase = firebase.database();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;