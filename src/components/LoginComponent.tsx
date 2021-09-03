import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import {Redirect} from "react-router-dom";
import {Principal} from "../dtos/principal";
import {authenticate} from "../remote/auth-service";
import ErrorMessageComponent from "./ErrorMessageComponent";

interface ILoginProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    loginContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '3rem',
    }
});

function LoginComponent(props: ILoginProps){

    const classes = useStyles();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    let handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name] : value});
    }

    async function login() {

        if (!formData.username || !formData.password) {
            setErrorMessage('You need to provide a username and password');
            return;
        }

        console.log(formData.username);
        console.log(formData.password);

        try{
            let principal = await authenticate({username : formData.username, password : formData.password});
            console.log(principal);
            props.setCurrentUser(principal);
        }catch (e : any){
            setErrorMessage(e.message);
        }
    }

    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
            <div className={classes.loginContainer} color="inherit">
                <Typography align="center" variant="h4">Login</Typography>
                <TextField id="username-input" label="Username" name="username" type="text" onChange={handleChange}/>
                <br/>
                <TextField id="password-input" label="Password" name="password" type="password" onChange={handleChange}/>
                <br/><br/>
                <Button id="login-bt" variant="contained" color="primary" onClick={login}>Login</Button>
                <br /><br />
                <p>No account yet?</p>
                <Button id="register-bt" variant="contained" color="primary" href="/register">Register!</Button>
            </div>
            <br/>
            { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
        </>
    );

}

export default LoginComponent;