import React from 'react';
import {Route,Redirect} from "react-router-dom";
  
const checkauth = () =>{
    const token =  localStorage.getItem("AccessToken");
   // console.log(token,"dtat")
    if(token !== undefined && token !== "" && token !=  null){
     // console.log("inside")
        return true
    }
    else{
     // console.log("outside")
        return false
    }
}

export default function PrivateRoute({ component: Component, ...rest }) {
    console.log( rest,"rest")
    return (
      <Route
        {...rest}
        render={({ props }) =>
        checkauth() ? (
            <Component {...props} />
          ) : (
            <Redirect exact
              to={{
                pathname: "/",
                // state: { from: location }
              }}
            />
          )
        }
      />
    );
  }