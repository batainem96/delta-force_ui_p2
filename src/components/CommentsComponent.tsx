import {Button, Container, Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import TextField from '@material-ui/core/TextField';
import {useState} from "react";
import {Comment} from "../dtos/comment";
import {getAge} from "../functions/get-age";
import {CommentDTO} from "../dtos/comment-dto";
import {submitCommentOnArticle} from "../remote/article-service";
import {Principal} from "../dtos/principal";

interface ICommentsProps {
    currentUser: Principal | undefined,
    comments: Comment[],
    setComments: (comment: Comment[]) => void,
    setCommentsOpen: (isCommentsOpen: boolean) => void,
    id: string
}

function CommentsComponent(props: ICommentsProps) {
    const classes = useStyles();
    let containers: JSX.Element[] = [];
    let comments = props.comments;

    comments.forEach(element => {
        containers.unshift(
            <>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <h4 style={{margin: 0, textAlign: "left"}}>{element.username}</h4>
                        <p style={{textAlign: "left"}}>
                            {element.content}
                            {" "}
                        </p>
                        <p style={{textAlign: "left", color: "gray"}}>
                            {getAge((new Date(element.timePosted)))}
                        </p>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{margin: "30px 0"}}/>
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

    const [shiftKeyDown, setShiftKeyDown] = useState(false);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Shift') {
            setShiftKeyDown(true);
            console.log(e);
            return;
        }

        if (e.key === 'Enter') {
            if (!shiftKeyDown) {
                submitComment();
            } else {
                // setValue(value+'\n');
            }
        }
    }

    const handleKeyUp = (e: any) => {
        if (e.key === 'Shift') {
            setShiftKeyDown(false);
        }
    }

    async function submitComment() {
        if (props.currentUser === undefined) {
            console.log("No user");
            return;
        }

        try {
            let comment = new CommentDTO(props.id, props.currentUser.username, value);
            let resp = await submitCommentOnArticle(comment);

            if (resp !== null) {
                props.setComments(resp.comments);
                setValue('');
            }
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <>
            <div className={classes.commentsBox}>
                <Container fixed maxWidth='md' className={classes.commentsContainer}>
                    <div className={classes.outerPane}>
                        <div className={classes.paneHeader}>
                            <h1 className={classes.commentsHeader}>Comments</h1>
                            <Button className={classes.closeCommentsButton} onClick={() => closeComments()}>X</Button>
                        </div>
                        <div className={classes.commentSubmitBox}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="comment"
                                multiline
                                maxRows={2}
                                value={value}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                onKeyUp={handleKeyUp}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={submitComment}>
                                        submit
                                    </Button>
                                }}
                                className={classes.commentTextField}
                            />
                        </div>
                        <div className={classes.commentsPane}>
                            <div style={{height: '100px'}}></div>

                            {containers}

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
const SHADOWGRAY = 'rgba(61,99,140,.08)';

const useStyles = makeStyles({
    commentsBox: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '64px',
        right: '0',
        bottom: '0',
        left: '0',
        background: `${BGTINT}`,
        zIndex: 3
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
        justifySelf: 'flex-start',
        marginTop: '10px'
    }
});