import { useState } from "react";
import {Redirect} from "react-router-dom";
import {Principal} from "../dtos/principal";
import {authenticate} from "../services/auth-service";

interface ILoginProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

function LoginComponent(props: ILoginProps){

    let[username, setUsename] = useState('');
    let[password, setPassword] = useState('');
    let[errorMessage, setErrorMessage] = useState('');

    function updateUsername(e:any){
        setUsename(e.currentTarget.value);
    }

    function updatePassword(e:any){
        setPassword(e.currentTarget.value);
    }

    async function login() {
        console.log('Button clicked: ', username, password);

        try{
            if(username && password){
                let principal = await authenticate({username, password});
                console.log(principal);
                props.setCurrentUser(principal);
            }
        }catch (e){
                setErrorMessage(e.message);
        }
    }

    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
            <div>
                <input id="username-input" type="text" onChange={updateUsername}/>
                <br></br>
                <input id="password-input" type="text" onChange={updatePassword}/>
                <br></br>
                <button id="login-bt" onClick={login}>Login</button>
                <br></br>
            </div>
        </>
    );

}

export default LoginComponent;