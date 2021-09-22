import {Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {banUser} from "../remote/user-service";
import {Redirect, useHistory} from "react-router-dom";
import ErrorMessageComponent from "./ErrorMessageComponent";
import SuccessMessageComponent from "./SuccessMessageComponent";

interface IProfile {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const FAINTGREY = '#9b9b9b';

const useStyles = makeStyles({
    profileContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        border: `solid ${FAINTGREY}`,
        borderRadius: '12px',
        borderWidth: '1px',
        background: '#D3D3D3'
    }
});

function BanUserComponent(props: IProfile) {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    let handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    let handleBan = async () => {
        try {
            await banUser(formData.username);
            setSuccessMessage(`${formData.username} has been banned.`);
            setErrorMessage('');
        } catch (e: any) {
            console.log(e);
            setSuccessMessage('');
            setErrorMessage('Invalid username provided.');
        }
    }

    const handleGoBack = () => {
        history.push('/admin-dashboard');
    }

    return (
        <>
            {props.currentUser ?
            <Container fixed maxWidth='md' id="ban-user" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Banning a user...</Typography>
                <br/><br/>
                <TextField id='username' label="Provide user's username" name="username" type="text"
                           onChange={handleChange}/> <br/><br/>
                <br/>
                {successMessage ? <SuccessMessageComponent successMessage={successMessage}/> : <></>}
                {errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></>}
                <br/>
                <Button
                    id="edit-button"
                    onClick={handleBan}
                    variant="contained"
                    color="secondary"
                    size="medium">Ban User</Button>
                <br/><br/>

                <Button
                    id="edit-button"
                    onClick={handleGoBack}
                    color="primary"
                    size="medium">Back</Button>
                <br/><br/>
            </Container>
            :
            <Redirect to='/'/>
            }
        </>
    );
}

export default BanUserComponent;