import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import {Redirect, useHistory} from "react-router-dom";
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

    let handleKeyUp = (e : any) => {
        if(e.key === 'Enter') {
            login();
        }
    }

    async function login() {

        if (!formData.username || !formData.password) {
            setErrorMessage('You need to provide a username and password');
            return;
        }

        try{
            let principal = await authenticate({username : formData.username, password : formData.password});
            props.setCurrentUser(principal);
        }catch (error: any) {
            setErrorMessage(error.message);
        };
    }

    const history = useHistory();

    let navToRegister = () => {
        history.push('/register');
    }

    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
            <Container fixed maxWidth='sm' className={classes.loginContainer} color="inherit">
                <Typography align="center" variant="h4">Login</Typography>
                <br/>
                <TextField id="username-input" label="Username" name="username" type="text" onChange={handleChange} onKeyUp={handleKeyUp} autoFocus/>
                <br/>
                <br/>
                <TextField id="password-input" label="Password" name="password" type="password" onChange={handleChange} onKeyUp={handleKeyUp}/>
                <br/>
                <br/><br/>
                <Button id="login-bt" variant="contained" color="primary" onClick={login}>Login</Button>
                <p>No account yet?<span style={{color:"#0000EE", cursor:"pointer", textDecoration:"underline"}} onClick={navToRegister}> Sign Up</span></p>

                <br/>

                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </Container>
            
        </>
    );

}

export default LoginComponent;
