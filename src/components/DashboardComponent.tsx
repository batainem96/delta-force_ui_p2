import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useEffect, useState} from "react";
import {Article} from "../dtos/article";
import {Principal} from "../dtos/principal";
import {ArticleQuery} from "../models/acticle-query";
import {getArticles, getPopularArticles} from "../remote/article-service";
import ArticleContainerComponent from "./ArticleContainerComponent";

// Current User data
interface IDashboardProps {
    currentUser: Principal | undefined,
    searchQuery: ArticleQuery | undefined,
    setSearchQuery: (articleQuery: ArticleQuery | undefined) => void
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

        if (props.currentUser) {
            if (!props.searchQuery || props.searchQuery.query === '') {
                getPopularArticles().then(articles => {
                    setData(articles);
                }).catch((e: any) => {
                    console.log(e);
                });
                return () => {
                    setData([]);
                }
            } else {
                getArticles(props.searchQuery.queryType, props.searchQuery.query).then(articles => {
                    setData(articles);
                }).catch((e: any) => {
                    console.log(e);
                });
                return () => {
                    setData([]);
                }
            }
        } else {
            return;
        }
    }, [props.searchQuery]);

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
                    <img
                        src='https://listimg.pinclipart.com/picdir/s/566-5666099_transparent-delta-symbol-png-delta-greek-letter-png.png'
                        alt='logo'/>
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
                    <ArticleContainerComponent currentUser={props.currentUser}
                                               article={data}></ArticleContainerComponent>
                </Container>
            </>
    )
}

export default DashboardComponent;