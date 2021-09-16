import {deltaforceClient} from "./deltaforce-client";

export const getArticles = async () => {

    let resp = await deltaforceClient.get('/news/popular');

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;

}