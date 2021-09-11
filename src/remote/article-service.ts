import { ArticleDTO } from "../dtos/article-dto";
import { deltaforceClient } from "./deltaforce-client";

export const getArticles = async () => {
    
    let resp = await(deltaforceClient.get("/news"));

    if (resp.status === 401) {
        throw resp.data;
    }

    return resp.data;
};

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