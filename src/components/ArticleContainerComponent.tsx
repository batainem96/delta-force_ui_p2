import { useState } from "react";
import Container from '@material-ui/core/Container';

import { Article } from '../dtos/article';
import { makeStyles } from "@material-ui/core";

interface IArticles {
    article: Article[];
}

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

function ArticleContainerComponent(articles: IArticles) {
    const classes = useStyles();
    let containers: JSX.Element[] = [];
    let currentDate = new Date();

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
                    <h3 className={classes.bodyTitle}>{element.title}</h3>
                    <p className={classes.bodyContent}>{element.content}</p>
                    <img className={classes.bodyImg} src={element.urlToImage} />
                </div>
                <div className={classes.articleFooter}>
                    <a className={classes.footerURL} href={element.url}>Read Full Story</a>
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
        margin: '0 0 .5rem 0'
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

export default ArticleContainerComponent;