export class Principal {

    id: string;
    username: string;
    token: string;
    role: string;
    favTopics: Array<string>;

    constructor(id: string, username: string, role: string, token: string, favTopics: Array<string>) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.role = role;
        this.favTopics = favTopics;
    }
}