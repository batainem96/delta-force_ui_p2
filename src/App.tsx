import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import NavbarComponent from "./components/NavbarComponent";
import { Principal } from './dtos/principal';

function App() {

  let [currentUser, setCurrentUser] = useState(undefined as Principal | undefined);

  return (
      <BrowserRouter>
        <NavbarComponent />
        <Switch>
            {/* <Route exact path="/dashboard" render={() => <DashboardComponent currentUser={currentUser} /> } /> */}
            <Route path="/login" render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            {/* <Route path="/register" render={() => <RegisterComponent currentUser={currentUser} /> } /> */}
        </Switch>
      </BrowserRouter>
  );
}

export default App;
