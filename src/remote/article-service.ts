import { ArticleDTO } from "../dtos/article-dto";
import { deltaforceClient } from "./deltaforce-client";

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

        let resp = await(deltaforceClient.get(`/news/q?category=${query}`));

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