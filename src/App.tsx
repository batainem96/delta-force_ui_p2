import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import NavbarComponent from "./components/NavbarComponent";
import RegisterComponent from './components/RegisterComponent';
import { Principal } from './dtos/principal';

function App() {

  let [currentUser, setCurrentUser] = useState(undefined as Principal | undefined);

  return (
      <BrowserRouter>
        <NavbarComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <Switch>
            {/* <Route path="/" render={() => <IndexComponent/> } /> */}
            {/* <Route exact path="/dashboard" render={() => <DashboardComponent currentUser={currentUser} /> } /> */}
            <Route path="/login" render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            <Route path="/register" render={() => <RegisterComponent currentUser={currentUser} /> } />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
