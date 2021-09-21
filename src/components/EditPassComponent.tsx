import {Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {updatePass} from "../remote/user-service";
import {useHistory} from "react-router-dom";

interface IProfile {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void,
    userInfo: {
        firstName: string,
        lastName: string,
        email: string,
        username: string
    },
    setUserInfo: (userInfo: { firstName: string, lastName: string, email: string, username: string }) => void
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


function EditPassComponent(props: IProfile) {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        id: props.currentUser?.id,
        newPassword: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    let handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    let handleChangeConfirm = (e: any) => {
        setConfirmPassword(e.target.value);
    }

    let name = async () => {
        if (confirmPassword === formData.newPassword) {
            try {
                await updatePass(formData);
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Passwords did not match.')
        }
    }

    const handleGoBack = () => {
        history.push('/userprofile');
    }

    return (
        <>
            <Container fixed maxWidth='sm' id="edit-profile" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Edit Password</Typography>
                <br/><br/>
                <TextField id='password' label="Current Password*" name="password" type="password"
                           onChange={handleChange}/> <br/><br/>
                <TextField id='newPassword' label="New Password*" name="newPassword" type="password"
                           onChange={handleChange}/> <br/><br/>
                <TextField id='newPassword' label="Confirm Password*" name="confirmPassword" type="password"
                           onChange={handleChangeConfirm}/> <br/><br/>
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

export default EditPassComponent;