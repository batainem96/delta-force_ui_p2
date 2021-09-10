import {useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ArticleComponent from './components/ArticleComponent';
import DashboardComponent from './components/DashboardComponent';
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
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/dashboard" render={() => <DashboardComponent currentUser={currentUser} /> } />
            <Route exact path="/login" render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/> } />
            <Route exact path="/register" render={() => <RegisterComponent currentUser={currentUser} /> } />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
