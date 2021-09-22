import {Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {updateUsername} from "../remote/user-service";
import {useHistory} from "react-router-dom";
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


function EditUsernameComponent(props: IProfile) {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        id: props.currentUser?.id,
        newUsername: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    let handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    let handleKeyUp = (e: any) => {
        if(e.key === 'Enter') {
            updateNewUsername();
        }
    }

    let updateNewUsername = async () => {
        if(!formData.newUsername) {
            setErrorMessage('Username field required!');
        } else if(!formData.password) {
            setErrorMessage('Password is empty!');
        } else {
            try {
                await updateUsername(formData);
                setSuccessMessage('Username successfully updated!')
                setErrorMessage('');
                await sleep(800);
                handleGoBack();
            } catch (e) {
                if(e === 400) {
                    setErrorMessage('Username is not valid!');
                } else if(e === 401) {
                    setErrorMessage('Password incorrect!')
                } else if(e === 409) {
                    setErrorMessage('Username is already in use!')
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
            <Container fixed maxWidth='sm' id="edit-profile" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Edit Username</Typography>
                <br/><br/>
                <TextField id='standard-read-only-input'
                           label='Current Username'
                           style={{pointerEvents: 'none'}}
                           value={props.userInfo.username}/>
                <br/><br/>
                <TextField id='newUsername' label="New Username*" name="newUsername" type="text"
                           onChange={handleChange} onKeyUp={handleKeyUp}/> <br/><br/>
                <input name="fakeusernameremembered" type="text"
                       style={{display: 'none'}}/> {/* Hacky solution for browser credential fill */}
                <input name="fakepasswordremembered" type="password"
                       style={{display: 'none'}}/> {/* -------------------------------------- */}
                <TextField id='password' label="Password*" name="password" type="password" onChange={handleChange} onKeyUp={handleKeyUp}/>
                <br/><br/>
                <br/><br/>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button
                        style={{marginRight: '20px'}}
                        id="edit-button"
                        onClick={updateNewUsername}
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
        </>
    );
}

export default EditUsernameComponent;