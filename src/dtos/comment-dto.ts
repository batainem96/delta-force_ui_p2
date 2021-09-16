export class CommentDTO {

    articleId: string;
    username: string;
    content: string;

    constructor(url: string, username: string, content: string) {
        this.articleId = url;
        this.username = username;
        this.content = content;
    }
    
}