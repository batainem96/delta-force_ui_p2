import { Button, Container, InputAdornment, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";
import {Redirect, useHistory} from "react-router-dom";
import { getUserById } from "../remote/user-service";

interface IUserProfile{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void,
    userInfo: {
        firstName: string,
        lastName: string,
        email: string,
        username: string
    },
    setUserInfo: (userInfo: {firstName: string, lastName: string, email: string, username: string}) => void
}

const FAINTGREY = '#9b9b9b';

const useStyles = makeStyles({
    profileContainer: {
        textAlign: 'center',
        justifyContent: 'center', 
        border: `solid ${FAINTGREY}`,
        borderRadius: '12px',
        borderWidth: '1px',
    },

    profileEntry: {
        width: '50%'
    }
});

function UserProfileComponent(props: IUserProfile){

    const history = useHistory();
    const classes = useStyles();

    
    useEffect(() => {
        getUsers();
    }, [])

    let getUsers = async () => {
        try{
            let userInfo = await getUserById(props.currentUser?.id);
            props.setUserInfo({...userInfo});
        } catch( e: any){
            console.log(e);
        }
    }

    const handleNameChange = () => {
        history.push('/editprofile');
    }

    const handleEmailChange = () => {
        history.push('/editemail');
    }

    const handleUsernameChange = () => {
        history.push('/editusername');
    }

    const handlePassChange = () => {
        history.push('/editpass');
    }

    return (

        <>
            <Container fixed maxWidth='md' id="register-component" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Profile Settings</Typography>

                <br/><br/>

                <TextField
                    id="standard-read-only-input"
                    label="Name"
                    className={classes.profileEntry}
                    value={props.userInfo.firstName + ' ' + props.userInfo.lastName}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button 
                                    onClick={handleNameChange}
                                    color="primary"
                                    size="small"> Edit
                                </Button>
                            </InputAdornment>
                          )
                    }}
                />

                <br/><br/>

                <TextField
                    id="standard-read-only-input"
                    label="Email"
                    className={classes.profileEntry}
                    value={props.userInfo.email}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button 
                                    onClick={handleEmailChange}
                                    color="primary"
                                    size="small"> Edit
                                </Button>
                            </InputAdornment>
                          )
                    }}
                />

                <br/><br/>

                <TextField
                    id="standard-read-only-input"
                    label="Username"
                    className={classes.profileEntry}
                    value={props.userInfo.username}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button 
                                    onClick={handleUsernameChange}
                                    color="primary"
                                    size="small"> Edit
                                </Button>
                            </InputAdornment>
                          )
                    }}
                />

                <br/><br/>

                <TextField
                    id="standard-read-only-input"
                    label="Password"
                    type="password"
                    className={classes.profileEntry}
                    value={props.userInfo.username}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button 
                                    onClick={handlePassChange}
                                    color="primary"
                                    size="small"> Edit
                                </Button>
                            </InputAdornment>
                          )
                    }}
                />

                <br/><br/>
                <br/><br/>
                <br/><br/>

            </Container>
        
        </>
    );

}
export default UserProfileComponent;
