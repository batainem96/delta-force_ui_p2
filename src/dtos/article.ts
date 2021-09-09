export class Article {

    source: {
        id: string | undefined;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    likes: string[] | undefined;
    dislikes: string[] | undefined;
    comments: string[] | undefined;

    constructor(source: {id: string, name: string}, author: string, title: string, description: string, url: string, urlToImage: string, publishedAt: string,
        content: string, likes: string[], dislikes: string[], comments:string[]) {
            this.source = source;
            this.author = author;
            this.title = title;
            this.description = description;
            this.url = url;
            this.urlToImage = urlToImage;
            this.publishedAt = publishedAt;
            this.content = content;
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = comments;
        }

}