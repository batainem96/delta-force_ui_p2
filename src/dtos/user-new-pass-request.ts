export class UserNewPassRequest {

    id: string | undefined;
    newPassword: string;
    password: string;

    constructor(id: string, pass: string, pw: string) {
        this.id = id;
        this.newPassword = pass;
        this.password = pw;
    }
}