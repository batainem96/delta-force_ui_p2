import {Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {updatePass} from "../remote/user-service";
import {Redirect, useHistory} from "react-router-dom";
import SuccessMessageComponent from "./SuccessMessageComponent";
import ErrorMessageComponent from "./ErrorMessageComponent";

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

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    let handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    let handleChangeConfirm = (e: any) => {
        setConfirmPassword(e.target.value);
    }

    let handleKeyUp = (e: any) => {
        if(e.key === 'Enter') {
            updateNewPassword();
        }
    }

    let updateNewPassword = async () => {
        if (!formData.password || !formData.newPassword || !confirmPassword) {
            setErrorMessage('Password fields cannot be blank!')
        } else if (confirmPassword !== formData.newPassword) {
            setErrorMessage('New password fields must match!')
        } else {
            try {
                await updatePass(formData);
                setSuccessMessage('Password successfully updated!')
                setErrorMessage('');
                await sleep(800);
                handleGoBack();
            } catch (e) {
                if(e === 400) {
                    setErrorMessage('New password is not valid!');
                } else if(e === 401) {
                    setErrorMessage('Password was incorrect!')
                }
                setSuccessMessage('');
            }
        }
    }

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handleGoBack = () => {
        history.push('/userprofile');
    }

    return (
        <>
            {props.currentUser ?
            <Container fixed maxWidth='sm' id="edit-profile" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Edit Password</Typography>
                <br/><br/>
                <TextField id='password' label="Current Password*" name="password" type="password"
                           onChange={handleChange} onKeyUp={handleKeyUp}/> <br/><br/>
                <TextField id='newPassword' label="New Password*" name="newPassword" type="password"
                           onChange={handleChange} onKeyUp={handleKeyUp}/> <br/><br/>
                <TextField id='newPassword' label="Confirm New Password*" name="confirmPassword" type="password"
                           onChange={handleChangeConfirm} onKeyUp={handleKeyUp}/> <br/><br/>
                <br/><br/>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button
                        style={{marginRight: '20px'}}
                        id="edit-button"
                        onClick={updateNewPassword}
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
                
                <br/>
                {successMessage ? <SuccessMessageComponent successMessage={successMessage}/> : <></>}
                {errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></>}
                <br/>
            </Container>
            :
            <Redirect to='/'/>
            }
        </>
    );
}

export default EditPassComponent;