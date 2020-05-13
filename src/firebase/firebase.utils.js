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
                ...additionalData
            })
            saveUserToDB(`${!displayName ? additionalData.displayName : displayName}`, email, additionalData);
          //  options, 1) displayname comes with userAuth for google, 2) displayname is null for email/password
        }catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
 // export const fireBase = firebase.database();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;