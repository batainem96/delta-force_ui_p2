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

function AdminControlPanelComponent(props: IUserProfile){

    const history = useHistory();
    const classes = useStyles();
    const userRole = props.currentUser?.role;

    const renderBanMenu = () => {
        history.push('/admin-dashboard/ban');
    }

    return (
        
        <>{props.currentUser?.role==='admin'?
            <div id="admin-dashboard-component" className={classes.profileContainer}>

                <Typography align="center" variant="h4">Welcome, Commander!</Typography>
                <br/>
                <Typography align="center" variant="h6">Please select an option....</Typography>
                <br/>
                <Button 
                    onClick={renderBanMenu}
                    variant="contained"
                    color="primary"
                    size="small"> Ban a User </Button>
                    <br/><br/>

            </div>
            : 
            <Redirect to ='/' />}
        </>
    );
    

}

export default AdminControlPanelComponent;