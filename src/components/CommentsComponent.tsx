import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { useState } from "react";

import { Comment } from "../dtos/comment";
import { getAge } from "../functions/get-age";

interface ICommentsProps {

    comments: Comment[],
    setCommentsOpen: (isCommentsOpen: boolean) => void
}

function CommentsComponent(props: ICommentsProps) {
    const classes = useStyles();
    let containers: JSX.Element[] = [];
    let comments = props.comments;

    comments.forEach( element => {
        containers.push(
            <>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{ element.username }</h4>
                        <p style={{ textAlign: "left" }}>
                        { element.content }
                        {" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                        {getAge(new Date(), new Date(element.time))}
                        </p>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </>
        );
    });

    function closeComments() {
        props.setCommentsOpen(false);
    }

    return(
        <>
            <div className={classes.commentsBox}>
                <button className={classes.closeCommentsButton}onClick={() => closeComments()}>X</button>

                <Container fixed maxWidth='md' className={classes.commentsContainer}>
                    <div className={classes.commentsPane}>

                        <div style={{ padding: "40px 20px" }}>
                            <h1 className={classes.commentsHeader}>Comments</h1>

                            {containers}
                        </div>

                    </div>


                </Container>

            
            </div>
        </>
    );
}

export default CommentsComponent;

const BGTINT = 'rgba(0, 0, 0, 0.5)'

const useStyles = makeStyles ({
 
    commentsBox: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '64px',
        right: '0',
        bottom: '0',
        left: '0',
        background: `${BGTINT}`,
        overflow: 'hidden'
    },

    commentsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        overflow: 'hidden'
    },

    commentsPane: {
        height: '80%',
        width: '100%',
        borderRadius: '8px',
        background: '#ffff',
        overflow: 'scroll'
    },

    commentsHeader: {
        textAlign: 'left'
    },

    closeCommentsButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        height: '50px',
        width: '50px',

        '&:hover': {
            transform: 'scale(50)'
        }
    }

});