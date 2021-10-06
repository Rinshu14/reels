

import { useContext,useEffect } from "react";
import {auth, signInWithGoogle } from "../firebase";
import {Redirect} from "react-router-dom";
import { authContext } from "../AuthProvider";
let Login=()=>{
  let userDetails=useContext(authContext);
   
    return(
        <>
           {userDetails?<Redirect to="/"/>:""}
           
            <button type="button" class="btn btn-primary btn-lg m-4" onClick={()=>{signInWithGoogle()}}>Login With Google</button>
           
        </>
    )
}
export default Login;