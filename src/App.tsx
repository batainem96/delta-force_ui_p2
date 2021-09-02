import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ArticleComponent from './components/ArticleComponent';
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
            <Route exact path="/dashboard" render={() => <ArticleComponent currentUser={currentUser} /> } />
            <Route path="/login" render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            <Route path="/register" render={() => <RegisterComponent currentUser={currentUser} /> } />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
