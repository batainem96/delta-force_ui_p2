import { Button, Container, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";
import { updateName } from "../remote/user-service";
import { Redirect } from "react-router-dom";


interface IEditProfile{
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


function EditProfileComponent (props: IEditProfile){

    const classes = useStyles();

    const [formData, setFormData] = useState({
        id: '',
        newFirstName: '',
        newLastName: '',
        password: ''
    });
  

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }


    //update user name
    
    let name = async () => {

        try {
            await updateName(formData);
        }catch (e) {
            console.log(e);
        }
    }

    
        return (

//            props.currentUser ? <Redirect to="/editProfile"/> :
            <>
                <div id="edit-profile" className={classes.profileContainer} >
                <Typography align="center" variant="h4">Update your profile!</Typography>
                <TextField id='newFirstName' label="First Name" name="newFirstName" type="text" onChange={handleChange}/> <br/><br/>
                <TextField id='newLastName' label="Last Name" name="newLastName" type="text" onChange={handleChange}/> <br/><br/>
                <TextField id='password' label="Password" name="password" type="password" onChange={handleChange}/> <br/><br/>
                <br/><br/>

                <Button
                    id="edit-button"
                    onClick={name}
                    variant="contained"
                    color="primary"
                    size="medium">Save</Button>

                <br/><br/>

                </div>
            
            </>
        );
    
}
export default EditProfileComponent;
