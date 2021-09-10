import { AppBar, Container, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Article } from "../dtos/article";
import { Principal } from "../dtos/principal";
import { getArticles } from "../remote/mock-user-service";
import ArticleContainerComponent from "./ArticleContainerComponent";

interface IDashboardProps {
    currentUser : Principal | undefined
}

const useStyles = makeStyles({
    welcomeContainer: {
        justifyContent: "center",
        textAlign: "center",
        marginTop: "3rem"
    }
});

function DashboardComponent(props: IDashboardProps) {
    const classes = useStyles();

    const [data, setData] = useState([] as Article[]);

    useEffect(() => {
        getArticles().then(articles => {
            setData(articles);
        });
        return () => {
            setData([]);
        }
    }, []);

    return (
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