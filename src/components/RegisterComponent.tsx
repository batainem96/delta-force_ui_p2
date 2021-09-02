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
        marginTop: '15rem',
        width: "25%"
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
                <TextField id='firstName' label="First Name" name="firstName" type="text" onChange={handleChange}/> <br/>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
                    />
                </FormControl>


                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </FormControl>

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
