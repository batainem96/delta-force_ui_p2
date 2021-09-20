import { Button, Container, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";
import { updateName } from "../remote/user-service";
import {Redirect, useHistory} from "react-router-dom";


interface IEditProfile{
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
        borderWidth: '2px',
    },

    profileEntry: {
        width: '80%'
    }
});


function EditProfileComponent (props: IEditProfile){

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        id: props.currentUser?.id,
        newFirstName: props.userInfo.firstName,
        newLastName: props.userInfo.lastName,
        password: ''
    });
  

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    
    let name = async () => {

        try {
            await updateName(formData);
        }catch (error) {
            console.log(error);
        }
    }

    const handleGoBack = () => {
        history.push('/userprofile');
    }
    
        return (

            <>
                <Container fixed maxWidth='sm' id="edit-profile" className={classes.profileContainer} >

                    <br/>

                    <Typography align="center" variant="h4">Edit Name</Typography>

                    <br/><br/>

                    <TextField id='newFirstName' label="First Name" name="newFirstName" type="text" defaultValue={props.userInfo.firstName} onChange={handleChange}/> <br/><br/>
                    <TextField id='newLastName' label="Last Name" name="newLastName" type="text" defaultValue={props.userInfo.lastName} onChange={handleChange}/> <br/><br/>
                    <TextField id='password' label="Password" name="password" type="password" onChange={handleChange}/> <br/><br/>
                    <br/><br/>

                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <Button
                            style={{marginRight: '20px'}}
                            id="edit-button"
                            onClick={name}
                            variant="contained"
                            color="primary"
                            size="medium">Submit</Button>

                        <br/><br/>

                        <Button
                            id="edit-button"
                            onClick={handleGoBack}
                            variant="contained"
                            color="primary"
                            size="medium">back</Button>
                    </div>


                    <br/><br/>

                </Container>
            
            </>
        );
    
}
export default EditProfileComponent;
