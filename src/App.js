import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./Components/Home"
import Login from "./Components/Login"
import { firestore } from "./firebase";
import AuthProvider from "./AuthProvider"
import { useEffect } from "react";
let App=()=> {

  return (
    
   <>
      <AuthProvider>
        {/* //AuthProvider have context and onAuthStateChange that will call on login and logout and return userDetails and pass it to context
          //whenever userDetails get change by the login or logout  then this context of having userDetails as value
          // get change and this will reflect in the    all child of AuthProvider  */}
      <Router>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/login"><Login/></Route>
        </Switch>
        </Router>
        </AuthProvider>
    </>
  );
}

export default App;
