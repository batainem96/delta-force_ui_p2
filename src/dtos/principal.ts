export class Principal {

    id: string;
    username: string;
    token: string;
    favTopics: Array<string>;

    constructor(id: string, username: string, token: string, favTopics: Array<string>){
        this.id = id;
        this.username = username;
        this.token = token;
        this.favTopics = favTopics;
    }
}