import {useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import DashboardComponent from './components/DashboardComponent';
import LoginComponent from './components/LoginComponent';
import NavbarComponent from "./components/NavbarComponent";
import RegisterComponent from './components/RegisterComponent';
import {Principal} from './dtos/principal';
import UserProfileComponent from './components/UserProfileComponent';

import {ArticleQuery} from './models/acticle-query';

import EditProfileComponent from './components/EditProfileComponent';
import EditEmailComponent from './components/EditEmailComponent';
import EditUsernameComponent from './components/EditUsernameComponent';
import EditPassComponent from './components/EditPassComponent';
import AdminControlPanelComponent from './components/AdminControlPanelComponent';
import BanUserComponent from './components/BanUserComponent';

function App() {

    const [currentUser, setCurrentUser] = useState(undefined as Principal | undefined);
    const [searchQuery, setSearchQuery] = useState(undefined as ArticleQuery | undefined);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    });

    return (
        <BrowserRouter>
            <NavbarComponent currentUser={currentUser} setCurrentUser={setCurrentUser} searchQuery={searchQuery}
                             setSearchQuery={setSearchQuery}/>

            <Switch>
                <Route exact path="/">
                    <Redirect to="/dashboard"/>
                </Route>
                <Route exact path="/dashboard"
                       render={() => <DashboardComponent currentUser={currentUser} searchQuery={searchQuery}
                                                         setSearchQuery={setSearchQuery}/>}/>
                <Route exact path="/login"
                       render={() => <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                <Route exact path="/register" render={() => <RegisterComponent currentUser={currentUser}/>}/>
                <Route exact path="/userProfile" render={() => <UserProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
                <Route exact path="/editProfile" render={() => <EditProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
                <Route exact path="/editEmail" render={() => <EditEmailComponent currentUser={currentUser} setCurrentUser={setCurrentUser} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
                <Route exact path="/editUsername" render={() => <EditUsernameComponent currentUser={currentUser} setCurrentUser={setCurrentUser} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
                <Route exact path="/editPass" render={() => <EditPassComponent currentUser={currentUser} setCurrentUser={setCurrentUser} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
                <Route exact path="/admin-dashboard" render={() => <AdminControlPanelComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                <Route exact path="/admin-dashboard/ban" render={() => <BanUserComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
