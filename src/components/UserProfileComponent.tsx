import { Button, Container, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";
import {Redirect, useHistory} from "react-router-dom";


interface IUserProfile{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    profileContainer: {
        textAlign: 'center',
        justifyContent: 'center', 
        marginTop: '1rem',
        marginBottom: '3rem',
        marginLeft: '20rem',
        marginRight: '20rem',
        border: 'double', 
        borderColor: '#4b6fe4',
        borderRadius: '12px',
        borderWidth: '5px 20px',
    }
});

function UserProfileComponent(props: IUserProfile){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const classes = useStyles();

    
    useEffect(() => {
        getUsers();
    }, [])

    //displaying user information
    // TODO: Use the axios function declared in deltaforce-client and user-service to do this
    async function getUsers() {
        props.currentUser?
        await fetch(`http://deltaforcetakeover-env.eba-3fzzi4kr.us-east-2.elasticbeanstalk.com/user/${props.currentUser.id} `)

            .then((result) => {
                return result.json()
            }).then((resp) => {

                setFirstName(resp.firstName)
                setLastName(resp.lastName)
                setEmail(resp.email)
                setUsername(resp.username)
                setPassword(resp.password)
            })
            : console.log('test');
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
            <div id="register-component" className={classes.profileContainer}>

                <Typography align="center" variant="h4">Your Profile!</Typography>
                
                <TextField id='firstName' label="First Name" value={firstName} name="firstName" type="text" /> <br/><br/>
                <TextField id='lastName' label="Last Name" value={lastName} name="lastName" type="text" /> <br/><br/>
                <Button 
                    onClick={handleNameChange}
                    variant="contained"
                    color="primary"
                    size="small"> Edit </Button> <br/><br/>


                <TextField id='email' label="Email" value={email} name="email" type="email" /> <br/><br/>
                <Button 
                    onClick={handleEmailChange}
                    variant="contained"
                    color="primary"
                    size="small"> Edit </Button> <br/><br/>


                <TextField id='username' label="Username" value={username} name="username" type="text" /> <br/><br/>
                <Button 
                    onClick={handleUsernameChange}
                    variant="contained"
                    color="primary"
                    size="small"> Edit </Button> <br/><br/>

                <TextField id='password' label="Password" value={password} name="password" type="password" /> <br/><br/>
                <Button 
                    onClick={handlePassChange}
                    variant="contained"
                    color="primary"
                    size="small"> Edit </Button>

                <br/><br/>


            </div>
        
        </>
    );

}
export default UserProfileComponent;
