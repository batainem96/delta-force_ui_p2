export class Comment {

    username: string;
    content: string;
    timePosted: string;

    constructor(username: string, content: string, timePosted: string) {
        this.username = username;
        this.content = content;
        this.timePosted = timePosted;
    }
}