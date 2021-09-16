import { ArticleDTO } from "../dtos/article-dto";
import { CommentDTO } from "../dtos/comment-dto";
import { Comment } from "../dtos/comment";
import { deltaforceClient } from "./deltaforce-client";
import { Article } from "../dtos/article";

export const getPopularArticles = async () => {
    
    let resp = await(deltaforceClient.get("/news/popular"));

    if (resp.status === 401) {
        throw resp.data;
    }

    return resp.data;
};

export const getArticles = async(queryType: string, query: string) => {
    if(queryType==='search'){

        let resp = await(deltaforceClient.get(`/news/q?search=${query}`));

        if (resp.status >= 400 && resp.status < 500) {
            throw resp.data;
        }

        return resp.data;

    }else if(queryType ==='category'){

        let resp = await(deltaforceClient.get(`/news/category/${query}`));

        if (resp.status >= 400 && resp.status < 500) {
            throw resp.data;
        }

        return resp.data;

    }
    else
        throw console.error("Invalid search parameters provided");
        

}

export const likeArticle = async (username: ArticleDTO, articleId: string) => {

    let resp = await deltaforceClient.post(`/article/like?id=${articleId}`, username);

    if (resp.status === 401) {
        throw resp.data;
    }

    return resp.data;
    
}

export const dislikeArticle = async (username: ArticleDTO, articleId: string) => {

    let resp = await deltaforceClient.post(`/article/dislike?id=${articleId}`, username);

    if (resp.status === 401) {
        throw resp.data;
    }

    return resp.data;
}

export const submitCommentOnArticle = async (comment: CommentDTO) => {

    let resp = await deltaforceClient.post(`/article/comment`, comment);

    if (resp.status === 401) {
        throw resp.data;
    }

    return resp.data as Article;

}