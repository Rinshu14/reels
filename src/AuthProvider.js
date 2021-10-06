
//it is a file that  contains all logic for 
//authentication and creates a context and provider of userdata so that it can be 
//used by any child component 

import { createContext, useEffect, useState } from "react"
import {auth} from "./firebase"

export const authContext=createContext()
let AuthProvider=(props)=>{
    
 let[userDetails,setUserDetails]=useState(null);//this is a user state that is initially null
 let [loading,setLoading]=useState(true);//it loading is a state that means either the user has started not login or logged on OR login and logon process is continue bas khatam ni hui h         

 useEffect(()=>{//it is use effect of 1 case that execute only once after first render at that time it get register and execute whenever event occurs either of login or log out
    let unsub=auth.onAuthStateChanged((user)=>{//onAuthStateChange is a event listner that get fired whwnever a state cahnge of login or log out and if login 
        if(user)//means user is not null which means user is logged in
        {
            
            let{displayName,email,uid,photoURL}=user;
            setUserDetails({displayName,email,uid,photoURL});

            
        }
        else{//user is not logged in so user deatils will be null
            setUserDetails(null);
        }
        setLoading(false);//that means the process of login or logout is ended 
    })
    return ()=>//it is a cleanup function that will execute when component is removed from screen because there is no other useEffect here 
            {
              unsub();//unsubscribing the event listner onAuthStateChanged
              //it is returned by line no. 15 by subscribing call and unsub is a variable  name that can be any thing ;
            }
 },[])
   
    return(//we are returning the provider of authContext  that we have created with value userDetails because it is uesd all around the app
        <authContext.Provider value={userDetails}> 
        {/* this will add a provider of context above all its child */}
            {!loading && props.children} 
             
            {/* this means when the login or logout process is 
            finished and authProvider have any children 
            than display it 
            
            these are those children where we used this context in app.js and
            */}
        </authContext.Provider>
    )
}

export default AuthProvider;