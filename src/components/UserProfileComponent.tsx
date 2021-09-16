import { Button, Container, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";
import {Redirect, useHistory} from "react-router-dom";
import { getUserById } from "../remote/user-service";

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

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    });

    const history = useHistory();
    const classes = useStyles();

    
    useEffect(() => {
        getUsers();
    }, [])

    let getUsers = async () => {
        try{
            let userInfo = await getUserById(props.currentUser?.id);
            setUserData({...userInfo});
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
            <div id="register-component" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Your Profile!</Typography>
                
                <p>
                    Name: {userData.firstName} {userData.lastName}
                </p>
                <Button 
                    onClick={handleNameChange}
                    variant="contained"
                    color="primary"
                    size="small"> Edit Name </Button> <br/><br/>


                <p>Email: {userData.email}</p>
                <Button 
                    onClick={handleEmailChange}
                    variant="contained"
                    color="primary"
                    size="small"> Change Email </Button> <br/><br/>

                <p>Username: {userData.username}</p>
                <Button 
                    onClick={handleUsernameChange}
                    variant="contained"
                    color="primary"
                    size="small"> Change Username </Button> <br/><br/>

                <Button 
                    onClick={handlePassChange}
                    variant="contained"
                    color="primary"
                    size="small"> Change Password </Button>

                <br/><br/>


            </div>
        
        </>
    );

}
export default UserProfileComponent;
