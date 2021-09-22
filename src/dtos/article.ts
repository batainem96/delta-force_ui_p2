import {Comment} from "./comment";

export class Article {
    id: string;
    source: {
        id: string | undefined;
        name: string;
    };
    author: string;
    title: string | null;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string | null;
    likes: string[];
    dislikes: string[];
    comments: Comment[];

    constructor(id: string, source: { id: string, name: string }, author: string, title: string, description: string, url: string, urlToImage: string, publishedAt: string,
                content: string, likes: string[], dislikes: string[], comments: Comment[]) {
        this.id = id;
        this.source = source;
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
        this.content = content;

        this.likes = likes ? likes : [];
        this.dislikes = dislikes ? dislikes : [];
        this.comments = comments ? comments : [];
    }
}