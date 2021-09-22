import {Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {updateName} from "../remote/user-service";
import {useHistory} from "react-router-dom";
import SuccessMessageComponent from "./SuccessMessageComponent";
import ErrorMessageComponent from "./ErrorMessageComponent";
import WarningMessageComponent from "./WarningMessageComponent";

interface IEditProfile {
    currentUser: Principal | undefined,
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

function EditProfileComponent(props: IEditProfile) {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        id: props.currentUser?.id,
        newFirstName: props.userInfo.firstName,
        newLastName: props.userInfo.lastName,
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

    let handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    let handleKeyUp = (e: any) => {
        if(e.key === 'Enter') {
            updateNewInfo();
        }
    }

    let updateNewInfo = async () => {

        setErrorMessage('');
        setWarningMessage('');
        setSuccessMessage('');

        if(!formData.newFirstName || !formData.newLastName) {
            setErrorMessage('Name fields cannot be blank!');
        } else if(!formData.password) {
            setErrorMessage('Password field cannot be blank!');
        } else if(formData.newFirstName === props.userInfo.firstName && formData.newLastName === props.userInfo.lastName) {
            setWarningMessage('You haven\'t changed your information.')
        } else {
            try {
                await updateName(formData);
                setSuccessMessage('Information successfully updated!')
                await sleep(800);
                handleGoBack();
            } catch (e) {
                if(e === 400) {
                    setErrorMessage('Inputted information is not valid!');
                } else if(e === 401) {
                    setErrorMessage('Password was incorrect!')
                }
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
                <Typography align="center" variant="h4">Edit Name</Typography>
                <br/><br/>
                <TextField id='newFirstName' label="First Name" name="newFirstName" type="text"
                           defaultValue={props.userInfo.firstName} onChange={handleChange} onKeyUp={handleKeyUp}/> <br/><br/>
                <TextField id='newLastName' label="Last Name" name="newLastName" type="text"
                           defaultValue={props.userInfo.lastName} onChange={handleChange} onKeyUp={handleKeyUp}/> <br/><br/>
                <TextField id='password' label="Password" name="password" type="password" onChange={handleChange} onKeyUp={handleKeyUp}/>
                <br/><br/>
                <br/><br/>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button
                        style={{marginRight: '20px'}}
                        id="edit-button"
                        onClick={updateNewInfo}
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
                {warningMessage ? <WarningMessageComponent warnMessage={warningMessage}/> : <></>}
                {errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></>}
                <br/>
            </Container>
        </>
    );
}

export default EditProfileComponent;