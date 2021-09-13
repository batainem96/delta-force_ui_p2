export class UserNewPassRequest {

    id: string;
    newPass: string;
    password: string;

    constructor(id: string, pass: string, pw: string) {
        this.id = id;
        this.newPass = pass;
        this.password = pw;
    }

}