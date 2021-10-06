
import { useContext } from "react"
import { Redirect } from "react-router-dom"
import { authContext } from "../AuthProvider"
import {auth} from "../firebase"

let Home=()=>{
    let userDetails=useContext(authContext);//using authcontext context which is created in authProvider that have UserDeatils if user is looged in otherwise it is null
    console.log("hii");
    return(
     <>
        
       {userDetails? "":<Redirect to ="/Login"/>}
       
       {/* if userDetails is not null means user is logged in than remain in home if userDetails is null that user is not loggedin than redirect him to login page */}
          {/* Redirect is tag of react-router-dom library  */}
         <h1>HOME</h1>
         <button type="button" class="btn btn-primary btn-lg m-4" onClick={()=>{auth.signOut()}}>Log out</button>
     </>

    )
}
export default Home;