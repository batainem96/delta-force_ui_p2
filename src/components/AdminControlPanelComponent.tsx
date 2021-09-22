import {Button, Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Principal} from "../dtos/principal";
import {Redirect, useHistory} from "react-router-dom";

interface IUserProfile {
    currentUser: Principal | undefined,
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

function AdminControlPanelComponent(props: IUserProfile) {

    const history = useHistory();
    const classes = useStyles();

    const renderBanMenu = () => {
        history.push('/admin-dashboard/ban');
    }

    return (
        <>
            {props.currentUser?.role === 'admin' ?
            <Container fixed maxWidth='sm' id="admin-dashboard-component" className={classes.profileContainer}>
                <br/>
                <Typography align="center" variant="h4">Welcome, Commander!</Typography>
                <br/>
                <Typography align="center" variant="h6">Please select an option....</Typography>
                <br/><br/>
               

                <Button
                    onClick={renderBanMenu}
                    variant="contained"
                    color="secondary"
                    size="small"> Ban a User </Button>

                <br/><br/>
                <br/><br/>

            </Container>
            :
            <Redirect to='/'/>}
        </>
    );
}

export default AdminControlPanelComponent;