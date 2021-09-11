export class CommentDTO {

    url: string;
    username: string;
    content: string;

    constructor(url: string, username: string, content: string) {
        this.url = url;
        this.username = username;
        this.content = content;
    }
    
}