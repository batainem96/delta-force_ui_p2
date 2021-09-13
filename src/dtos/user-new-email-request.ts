export class UserNewEmailRequest {

    id: string;
    newEmail: string;
    password: string;

    constructor(id: string, email: string, pw: string) {
        this.id = id;
        this.newEmail = email;
        this.password = pw;
    }

}