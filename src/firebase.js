//it is a file that contains all code related to use firebase services


import firebase from "firebase/compat/app";//importing app module of firebase library in firebase named variable
import config from "./config.json";
import  "firebase/compat/storage";
import "firebase/compat/auth";//importing auth module for authenticatication again it will get in firebase variable
import "firebase/compat/firestore";//importing firstore module to use databse services again it will get in firebase variable 



  firebase.initializeApp(config);//it makes connection with firebase and react project or integrate the react project with firebase
   
  let provider=new firebase.auth.GoogleAuthProvider()//it tells what we are using for authentication  here GoogleAuthProvider tells we are using google account for authentication
  export const auth = firebase.auth();//creating the object of auth module to use its function that provides the services 
  
  export const firestore=firebase.firestore();
  export const signInWithGoogle=()=>{
    auth.signInWithPopup(provider);
    //it is a function of auth that provide signin with a popup with the way you provided provider
  }
 export const storage=firebase.storage();//exporting the object of firebase storage to use its functionality
 


  export default firebase//exporting the firebase variable