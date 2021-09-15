import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Divider, Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
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

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };

    const submitComment = () => {
        
    };

    return(
        <>
            <div className={classes.commentsBox}>
                <Container fixed maxWidth='md' className={classes.commentsContainer}>
                    <div className={classes.outerPane}>
                        <div className={classes.paneHeader}>
                            <h1 className={classes.commentsHeader}>Comments</h1>
                            <Button className={classes.closeCommentsButton}onClick={() => closeComments()}>X</Button>
                        </div>
                        <div className={classes.commentSubmitBox}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="comment"
                                multiline
                                maxRows={2}
                                value={value}
                                onChange={handleChange}
                                variant="outlined"
                                InputProps={{endAdornment: <Button variant='contained' color='primary' onClick={submitComment}>submit</Button>}}
                                className={classes.commentTextField}
                            />
                        </div>
                        <div className={classes.commentsPane}>
                            <div style={{height: '100px'}}></div>
                            
                            {containers}

                            {/* TEST STAHFF */}
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>USERNAME</h4>
                                    <p style={{ textAlign: "left" }}>
                                    BLAH BLAH comment stuff talk talk talk comment comment comment yehawyeeyeyeyeyeye sadjksajdlsajd sfhdsfiohewidnsd cdkschkewsjdfnksd vkldf jfidesf kd gm,fdn ikvnfdkjvn reikj gniua.
                                    {" "}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

                            <div style={{height: '60px'}}></div>

                        </div>
                    </div>
                </Container>

            
            </div>
        </>
    );
}

export default CommentsComponent;

const BGTINT = 'rgba(0, 0, 0, 0.5)';
const FAINTGREY = '#9b9b9b';
const SHADOWGRAY = 'rgba(61,99,140,.08)';

const useStyles = makeStyles ({
 
    commentsBox: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '64px',
        right: '0',
        bottom: '0',
        left: '0',
        background: `${BGTINT}`
    },

    commentsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        borderRadius: '8px'
    },

    outerPane: {
        position: 'relative',
        height: '80%',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden'
    },

    commentsPane: {
        height: '100%',
        paddingLeft: '20px',
        paddingRight: '20px',
        borderRadius: '8px',
        background: '#ffff',
        overflow: 'auto'
    },

    paneHeader: {
        position: 'absolute',
        top: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: 'white',
        width: '98%',
        borderBottom: `solid ${SHADOWGRAY}`,
        borderBottomWidth: 'thin'
    },

    commentSubmitBox: {
        position: 'absolute',
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        background: 'white',
        width: '98%'
    },

    commentTextField: {
       width: '100%',
       marginTop: '4px',
       marginLeft: '20px',
       marginBottom: '10px'
    },

    commentsHeader: {
        textAlign: 'left',
        marginLeft: '20px'
    },

    closeCommentsButton: {
        height: '30px',
        width: '30px',
        minWidth: '0',
        justifySelf: 'flex-start'
    }

});