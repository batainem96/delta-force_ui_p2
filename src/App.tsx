import React, {useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ArticleComponent from './components/ArticleComponent';
import LoginComponent from './components/LoginComponent';
import NavbarComponent from "./components/NavbarComponent";
import RegisterComponent from './components/RegisterComponent';
import { Principal } from './dtos/principal';
import UserProfileComponent from './components/UserProfileComponent';
import EditProfileComponent from './components/EditProfileComponent';

function App() {

  let [currentUser, setCurrentUser] = useState(undefined as Principal | undefined);

  return (
      <BrowserRouter>
        <NavbarComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>

        <Switch>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/dashboard" render={() => <ArticleComponent currentUser={currentUser} /> } />
            <Route exact path="/login" render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            <Route exact path="/register" render={() => <RegisterComponent currentUser={currentUser} /> } />
            <Route exact path="/userProfile" render={() => <UserProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            <Route exact path="/editProfile" render={() => <EditProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
