import { useState } from "react";
import Container from '@material-ui/core/Container';

import { Article } from '../dtos/article';
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { Principal } from "../dtos/principal";
import { dislikeArticle, likeArticle } from "../remote/article-service";

interface IArticles {
    currentUser: Principal | undefined;
    article: Article[];
}

function ArticleContainerComponent(articles: IArticles) {
    const classes = useStyles();
    let containers: JSX.Element[] = [];
    let currentDate = new Date();

    async function like(currentUser: Principal | undefined, articleId: string) {
        if (currentUser === undefined) {
            console.log("No user");
            return;
        }

        try {
            let resp = await likeArticle({username: currentUser.username}, articleId);
            console.log(resp);
        } catch (e: any) {
            console.log(e);
        }
    }

    async function dislike(currentUser: Principal | undefined, articleId: string) {
        if (currentUser === undefined) {
            console.log("No User");
            return;
        }

        try {
            let resp = await dislikeArticle({username: currentUser.username}, articleId);
        } catch (e: any) {
            console.log(e);
        }
    }

    articles.article.forEach(element => {
        let oldDate = new Date(element.publishedAt);
        // let age = currentDate - oldDate;
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
                    <img className={classes.bodyImg} src={element.urlToImage} />
                </div>
                <div className={classes.articleFooter}>
                    <a className={classes.footerURL} href={element.url} target='_blank'>Read Full Story Here</a>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button onClick={() => like(articles.currentUser, element.id)}>Like</Button>
                        <Button onClick={() => dislike(articles.currentUser, element.id)}>Dislike</Button>
                    </ButtonGroup>
                </div>
            </Container>
        );
    });

    return (
        <>
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
        content? content.split("…")[0] + '...'
        :
        ''
    );
}

// Calculate the age of the article and return the highest order representation (year > month > day > hour > minute)
function getAge(current: Date, old: Date): string {

    let years = current.getFullYear() - old.getFullYear(); // i.e. 2021 - 2020 = 1 year
    let months = old.getMonth() - current.getMonth(); // i.e. June (6) - February (2) = 4 months (note: if this is < 0, subtract 1 year [i.e. December (12) 2021 - January (1) 2020 is not a year!])
    if(months < 0) {
        years--;
        months *= -1; // The year rolled over, thus the months passed are out of order (1 - 12 = -11... not likely!)
    }
    let days = old.getDay() - current.getDay(); // Same logic as months
    if(days < 0) {
        months--;
        days *= -1;
    }
    let hours = old.getHours() - current.getHours(); // Di
    if(hours < 0) {
        days--;
        hours *= -1;
    }
    let minutes = old.getMinutes() - current.getMinutes(); // -tto
    if(minutes < 0) {
        hours--;
        minutes *= -1;
    }

    let age = '';
    if(years > 0) {
        age += `${years}y`;
    } else if(months > 0) {
        age += `${months}mo`;
    } else if(days > 0) {
        age += `${days}d`;
    } else if(minutes > 0) {
        age += `${minutes}min`;
    } else {
        age = 'now';
    }

    return age;
}

// Some colors I liked :>
const GREY = '#9E9E9E';
const FAINTGREY = '#9b9b9b';
const SHADOWGRAY = 'rgba(61,99,140,.08)';
const HEADERED = '#d34343';

const useStyles = makeStyles({
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
            transform: 'scale(1.025)',
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
        WebkitJustifyContent: 'flex-start',
        flexDirection: 'row'
    },

    footerURL: {
        textAlign: 'left',
        alignSelf: 'start',
        margin: '.5rem 0 0 0'
    }

});