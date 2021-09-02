import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";

import {Button, FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";

import ErrorMessageComponent from "./ErrorMessageComponent";
import {Principal} from "../dtos/principal";
import {registerNewUser} from "../remote/user-service";
import { TextField } from "@material-ui/core";

interface IRegisterProps {
    currentUser: Principal | undefined
}

const useStyles = makeStyles({
    registerContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '3rem',
    }
});

function RegisterComponent(props: IRegisterProps) {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let isFormValid = () => {
        for (let field in formData) {
            // TODO: Make TypeScript behave.
            //@ts-ignore
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    }

    let register = async () => {

        if (!isFormValid()) {
            setErrorMessage('You need to complete the registration form!');
            return;
        }

        try {
            await registerNewUser(formData);
            history.push('/login');
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
              } else {
                console.error("🤷‍♂️"); // Who knows?
              }
        }
    }

    return (

        props.currentUser ? <Redirect to="/dashboard"/> :

            <div id="register-component" className={classes.registerContainer}>
                <Typography align="center" variant="h4">Register for a DeltaForce News Account!</Typography>
                <TextField id='firstName' label="First Name" name="firstName" type="text" onChange={handleChange}/> <br/><br/>
                <TextField id='lastName' label="Last Name" name="lastName" type="text" onChange={handleChange}/> <br/><br/>
                <TextField id='email' label="Email" name="email" type="email" onChange={handleChange}/> <br/><br/>
                <TextField id='username' label="Username" name="username" type="text" onChange={handleChange}/> <br/><br/>
                <TextField id='password' label="Password" name="password" type="password" onChange={handleChange}/> <br/><br/>
                <br/><br/>

                <Button
                    id="register-button"
                    onClick={register}
                    variant="contained"
                    color="primary"
                    size="medium">Register</Button>

                <br/><br/>

                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }

            </div>

    );

}

export default RegisterComponent;
