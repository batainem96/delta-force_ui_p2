import { AppBar, Container, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Article } from "../dtos/article";
import { Principal } from "../dtos/principal";
import { getArticles, getPopularArticles } from "../remote/article-service";
import ArticleContainerComponent from "./ArticleContainerComponent";
import {PrincipalJWT} from "../dtos/jwt-dto";
import jwt from "jwt-decode";
import {deltaforceClient} from "../remote/deltaforce-client";

// Current User data
interface IDashboardProps {
    currentUser : Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

// Styling
const useStyles = makeStyles({
    welcomeContainer: {
        justifyContent: "center",
        textAlign: "center",
        marginTop: "3rem"
    }
});

function DashboardComponent(props: IDashboardProps) {

    // Get Styles
    const classes = useStyles();

    // Fetching articles
    const [data, setData] = useState([] as Article[]);

    useEffect(() => {
        if (!props.currentUser) {
            let token = localStorage.getItem("api-token");
            if (token) {
                let parsedUser: PrincipalJWT = jwt(token);
                let authUser: Principal = {
                    id: parsedUser.jti,
                    username: parsedUser.sub,
                    token: token,
                    role: parsedUser.role,
                    favTopics: []
                };
                deltaforceClient.defaults.headers["Authorization"] = token;
                props.setCurrentUser(authUser);
            } else {
                console.log("No user, get out of here");
                return;
            }
        }
        getPopularArticles().then(articles => {
            setData(articles);
        });
        return () => {
            setData([]);
        }
    }, []);

    return (
        // If currentUser is undefined or not logged in
        !props.currentUser
        ?
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
        :
        // If currentUser is logged in
        <>
            <Container className={classes.welcomeContainer}>
                <Typography variant="h4">
                    Welcome, {props.currentUser.username}!
                </Typography>
                <ArticleContainerComponent currentUser={props.currentUser} article={data}></ArticleContainerComponent>
            </Container>
        </>
    )
}

export default DashboardComponent;