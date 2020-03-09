import React from 'react';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './Views/Private';
import ProtectedPage from  './Views/Dashboard/Dashboard';
import Login from './Views/Login/Login';
import history from './Views/history'; 

function App() {
  return (
     <React.Fragment>
       <Router history={history}> 
       <Switch>
       <Route exact path="/" component={Login} />
       <PrivateRoute   data="true" path="/protected" component={ProtectedPage}/>
           
         
       </Switch>
       </Router>
     </React.Fragment>
  );
}

export default App;
