import {Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";
import {Principal} from "../dtos/principal";
import {banUser} from "../remote/user-service";
import {useHistory} from "react-router-dom";
import ErrorMessageComponent from "./ErrorMessageComponent";
import SuccessMessageComponent from "./SuccessMessageComponent";

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
            <div id="ban-user" className={classes.profileContainer}>
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
                    color="primary"
                    size="medium">Ban User</Button>
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