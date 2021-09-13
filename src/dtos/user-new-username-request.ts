export class UserNewUsernameRequest {

    id: string;
    newUsername: string;
    password: string;

    constructor(id: string, username: string, pw: string) {
        this.id = id;
        this.newUsername = username;
        this.password = pw;
    }

}