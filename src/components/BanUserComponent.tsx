import { Button, Container, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";
import { banUser } from "../remote/user-service";
import {Redirect, useHistory} from "react-router-dom";

interface IProfile{
    currentUser: Principal | undefined
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


function BanUserComponent (props: IProfile){

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: ''
    });
  

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    
    let handleBan = async () => {

        try {
            await banUser(formData.username);
        }catch (e) {
            console.log(e);
        }
    }

    const handleGoBack = () => {
        history.push('/admin-dashboard');
    }
    
        return (

            <>
                <div id="ban-user" className={classes.profileContainer} >
                <Typography align="center" variant="h4">Banning a user...</Typography>
                <TextField id='newEmail' label="Email" name="newEmail" type="text" onChange={handleChange}/> <br/><br/>
                <TextField id='password' label="Password" name="password" type="password" onChange={handleChange}/> <br/><br/>
                <br/><br/>

                <Button
                    id="edit-button"
                    onClick={handleBan}
                    variant="contained"
                    color="primary"
                    size="medium">Save</Button>

                <br/><br/>

                <Button
                    id="edit-button"
                    onClick={handleGoBack}
                    variant="contained"
                    color="primary"
                    size="medium">Back</Button>

                <br/><br/>

                </div>
            
            </>
        );
    
}
export default BanUserComponent;