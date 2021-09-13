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

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const history = useHistory();
    const classes = useStyles();

    //get and display user infor
    const getUser = () => {
        fetch(`http://localhost:5000/user/${props.currentUser?.id}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setFormData(json);
                
            });
    };

    const handleChange = () => {
        history.push('/profile');
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
       
    }

    return (

       
        <>
            <div id="edit-profile" className={classes.profileContainer} >
                <h1>Your profile</h1>

                <form onSubmit={handleSubmit}>

                    <button onClick={getUser}> View your profile</button>
                    <button ref="/profile" > Edit your profile</button>

                <div>
                    <h3> First Name:  {formData.firstName} </h3>

                    <h3> Last Name:  {formData.lastName} </h3>

                    <h3> Email:  {formData.email} </h3>
                    
                    <h3> Username:  {formData.username} </h3>

                    <h3> Password:  {formData.password} </h3>
                     

                </div>
    
                </form>

            </div>
        
        </>
    );

}
export default UserProfileComponent;
