import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";

import {Button, Container, FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";

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
    },

    registerEntry: {
        marginBottom: '20px'
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
    const [firstError, setFirstError] = useState(false);
    const [lastError, setLastError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let isFormValid = () => {

        setFirstError(formData.firstName? false : true);
        setLastError(formData.lastName? false : true);
        setEmailError(formData.email? false : true);
        setUsernameError(formData.username? false : true);
        setPasswordError(formData.password? false : true);

        let isValid = true;
        for (let field in formData) {
            // TODO: Make TypeScript behave.
            //@ts-ignore
            if (!formData[field]) {
                isValid = false;
            }
        }
        return isValid;
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

            <Container fixed maxWidth="sm" id="register-component" className={classes.registerContainer}>
                <Typography align="center" variant="h4">Register for a DeltaForce News Account!</Typography>

                <br/><br/>

                <div style={{display:"flex", justifyContent:"space-between", marginLeft:"20px", marginRight:"20px", marginBottom:"20px"}}>
                    <TextField error={firstError} id='firstName' label="First Name*" name="firstName" variant="outlined" onChange={handleChange}/>
                    <TextField error={lastError} id='lastName' label="Last Name*" name="lastName" variant="outlined" onChange={handleChange}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", alignContent:"space-evenly", marginLeft:"20px", marginRight: "20px"}}>
                    <TextField error={emailError} id='email' label="Email*" name="email" variant="outlined" onChange={handleChange} className={classes.registerEntry}/>
                    <TextField error={usernameError} id='username' label="Username*" name="username" variant="outlined" onChange={handleChange} className={classes.registerEntry}/>
                    <TextField error={passwordError} id='password' label="Password*" name="password" variant="outlined" onChange={handleChange} className={classes.registerEntry}/>
                </div>

                <Button
                    id="register-button"
                    onClick={register}
                    variant="contained"
                    color="primary"
                    size="medium">Register</Button>

                <br/><br/>

                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }

            </Container>

    );

}

export default RegisterComponent;
