import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import { Principal } from '../dtos/principal';

// Current User data
interface IArticleProps {
    currentUser: Principal | undefined
}

// Styling
const useStyles = makeStyles({
    welcomeContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '3rem',
    }
});


// Building Component
function ArticleComponent(props:IArticleProps){

    // Get Styles
    const classes = useStyles();

    return(
        // If currentUser is undefined/not logged in
        !props.currentUser?
            <>
            <Container className={classes.welcomeContainer}>
                <Typography variant="h4">
                    Welcome to DeltaForce News!
                </Typography>
                <br/>
                <img src='https://listimg.pinclipart.com/picdir/s/566-5666099_transparent-delta-symbol-png-delta-greek-letter-png.png' alt='logo'/>
                <br/>
                <Typography variant="subtitle1">
                    Log in or register now to begin setting up your very own personalized News Feed!
                </Typography>
            </Container>
            </>
            :// If currentUser is defined/logged in
            <>
                <Typography align="center" variant="h4">
                    Welcome, {props.currentUser.username}!
                </Typography>
            </>
        );
}

// Export so router can see
export default ArticleComponent;