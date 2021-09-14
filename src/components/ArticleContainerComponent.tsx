import { useEffect, useState } from "react";
import Container from '@material-ui/core/Container';

import { Article } from '../dtos/article';
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { Principal } from "../dtos/principal";
import { dislikeArticle, likeArticle } from "../remote/article-service";
import { Comment } from "../dtos/comment";
import CommentsComponent from "./CommentsComponent";

import { getAge } from "../functions/get-age";

interface IArticles {
    currentUser: Principal | undefined;
    article: Article[];
}

function ArticleContainerComponent(articles: IArticles) {
    const classes = useStyles();
    const [isCommentsOpen, setCommentsOpen] = useState(false);
    const [comments, setComments] = useState([
        {
            username: '',
            content: 'No Comments'
        }
    ] as Comment[])

    let containers: JSX.Element[] = [];

    let currentDate = new Date();

    // like function
    async function like(currentUser: Principal | undefined, articleId: string) {
        if (currentUser === undefined) {
            console.log("No user");
            return;
        }

        try {
            let resp = await likeArticle({username: currentUser.username}, articleId);

            let likeCountId = "likes" + articleId;
            let likeCountElement: HTMLElement | null = document.getElementById(`${likeCountId}`);
            if (likeCountElement !== null) {
                likeCountElement.innerText = resp.likes.length;
            }

            let dislikeCountId = "dislikes" + articleId;
            let dislikeCountElement: HTMLElement | null = document.getElementById(`${dislikeCountId}`);
            if (dislikeCountElement !== null) {
                dislikeCountElement.innerText = resp.dislikes.length;
            }

        } catch (e: any) {
            console.log(e);
        }

    }

    // dislike function
    async function dislike(currentUser: Principal | undefined, articleId: string) {
        if (currentUser === undefined) {
            console.log("No User");
            return;
        }

        try {
            let resp = await dislikeArticle({username: currentUser.username}, articleId);
            
            let likeCountId = "likes" + articleId;
            let likeCountElement: HTMLElement | null = document.getElementById(`${likeCountId}`);
            if (likeCountElement !== null) {
                likeCountElement.innerText = resp.likes.length;
            }

            let dislikeCountId = "dislikes" + articleId;
            let dislikeCountElement: HTMLElement | null = document.getElementById(`${dislikeCountId}`);
            if (dislikeCountElement !== null) {
                dislikeCountElement.innerText = resp.dislikes.length;
            }

        } catch (e: any) {
            console.log(e);
        }
    }

    function openComments(artComments: Comment[]) {
        console.log('openComments clicked!')
        if(!isCommentsOpen) {

            setComments(artComments);

            console.log('openComments clicked (prev: false)');
            setCommentsOpen(true);
            
        }
    }

    articles.article.forEach(element => {
        let likes: number = (element?.likes?.length !== undefined) ? element.likes.length : 0;
        let dislikes: number = (element?.dislikes?.length !== undefined) ? element.dislikes.length : 0;
        
        let likesId = "likes" + element.id;
        let dislikesId = "dislikes" + element.id;


        let oldDate = new Date(element.publishedAt);
        let artComments = element.comments? element.comments : [];
        containers.push(
            <Container fixed maxWidth='sm' className={classes.articleContainer}>
                <div className={classes.articleHeader}>
                    <p className={classes.headerSource}>{element.source.name}</p>
                    <p className={classes.headerDivider}>|</p>
                    <p className={classes.headerAuthor}>{element.author}</p>
                    <p className={classes.headerAge}>{getAge(currentDate, oldDate)}</p>
                </div>
                <div className={classes.articleBody}>
                    <h3 className={classes.bodyTitle}>{trimTitle(element.title)}</h3>
                    <p className={classes.bodyContent}>{trimContent(element.content)}</p>
                    <img className={classes.bodyImg} src={element.urlToImage} alt=""/>
                </div>
                <div className={classes.articleFooter}>
                    <a className={classes.footerURL} href={element.url} target='_blank'>Read Full Story Here</a>
                    {
                    !isCommentsOpen
                    ?
                    <div>
                        <Button onClick={() => like(articles.currentUser, element.id)}>
                            <img src='./outline_thumb_up_black_24dp.png' alt='Like'/>
                            <span id={likesId}>{likes}</span>
                        </Button>
                        <Button onClick={() => dislike(articles.currentUser, element.id)}>
                            <img src='./outline_thumb_down_black_24dp.png' alt='Dislike'/>
                            <span id={dislikesId}>{dislikes}</span>
                        </Button>

                        <Button onClick={() => openComments(artComments)}><img src='./outline_chat_black_24dp.png' alt='Comment'/></Button>
                    </div>
                    :
                    null
                    }
                </div>
            </Container>   
        );

    });
    return (
        <>
            { 
            isCommentsOpen 
            ? 
            <CommentsComponent comments={comments} setCommentsOpen={setCommentsOpen} />
            :
            null
            }
            {containers}
            
        </>
    );
}

export default ArticleContainerComponent;

// Remove the source at the end of the title (follows a dash)
function trimTitle(title: string | null): string {
    let result = '';
    if(title) {
        let titleSplit = title.split('-');
        result = titleSplit[0];
        for(let i = 1; i < titleSplit.length-1; i++) { // Put non-closing dashes back in the string
            result += '-' + titleSplit[i];
        }
    }
    return result;
}

// Remove the characters remaining tag at the end of content
function trimContent(content: string | null): string {
    return (
        content
        ?
        content.split("…")[0] + '...'
        :
        ''
    );
}

// Some colors I liked :>
const GREY = '#9E9E9E';
const FAINTGREY = '#9b9b9b';
const SHADOWGRAY = 'rgba(61,99,140,.08)';
const HEADERED = '#d34343';

let hover = 'none';

export interface StyleProps {
    hover: 'none'
}

const useStyles = makeStyles<StyleProps>({

    articleContainer: {
        borderRadius: '8px',
        boxShadow: `0px 0px 16px ${SHADOWGRAY}`,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        padding: '1.5rem',
        marginTop: '1rem',
        transition: 'all .5s ease-in-out',

        '&:hover': {
            
            transform: 'scale(1.025)'
        }
    },

    articleHeader: {
        display: 'flex',
        WebkitJustifyContent: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'left',
        marginBottom: '1rem'
    },

    headerSource: {
        textAlign: 'left',
        fontSize: '.9rem',
        color: `${HEADERED}`,
        alignSelf: 'flex-end',
        margin: '0 .5rem 0 0'
    },

    headerAuthor: {
        textAlign: 'left',
        fontSize: '.8rem',
        alignSelf: 'flex-end',
        color: `${FAINTGREY}`,
        margin: '0 .5rem 0 0'
    },

    headerAge: {
        textAlign: 'left',
        fontSize: '.8rem',
        color: `${GREY}`,
        alignSelf: 'flex-end',
        margin: '0'
    },

    headerDivider: {
        alignSelf: 'flex-end',
        fontSize: '.8rem',
        color: `${GREY}`,
        margin: '0 .5rem 0 0'
    },

    articleBody: {
        margin: '0'
    },

    bodyTitle: {
        textAlign: 'left',
        fontSize: '.875rem',
        margin: '0 0 1rem 0'
    },

    bodyContent: {
        textAlign: 'left',
        fontSize: '.8rem',
        margin: '0 0 .5rem 0'
    },

    bodyImg: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px'
    },

    articleFooter: {
        display: 'flex',
        WebkitJustifyContent: 'space-between',
        flexDirection: 'row'
    },

    footerURL: {
        textAlign: 'left',
        alignSelf: 'start',
        margin: '.5rem 0 0 0'
    }
});