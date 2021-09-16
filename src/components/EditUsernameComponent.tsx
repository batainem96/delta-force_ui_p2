import {Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {updateUsername} from "../remote/user-service";
import {useHistory} from "react-router-dom";

interface IProfile {
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

function EditUsernameComponent(props: IProfile) {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        id: props.currentUser?.id,
        newUsername: '',
        password: ''
    });


    let handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }


    let name = async () => {
        try {
            await updateUsername(formData);
        } catch (e) {
            console.log(e);
        }
    }

    const handleGoBack = () => {
        history.push('/userprofile');
    }


    return (
        <>
            <div id="edit-profile" className={classes.profileContainer}>
                <Typography align="center" variant="h4">Update your profile!</Typography>
                <TextField id='newUsername' label="Username" name="newUsername" type="text" onChange={handleChange}/>
                <br/><br/>
                <TextField id='password' label="Password" name="password" type="password" onChange={handleChange}/>
                <br/><br/>
                <br/><br/>
                <Button
                    id="edit-button"
                    onClick={name}
                    variant="contained"
                    color="primary"
                    size="medium">Save</Button>
                <br/><br/>
                <Button
                    id="edit-button"
                    onClick={handleGoBack}
                    variant="contained"
                    color="primary"
                    size="medium">back</Button>
                <br/><br/>
            </div>
        </>
    );
}

export default EditUsernameComponent;