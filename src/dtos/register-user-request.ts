export class RegisterUserRequest {

    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;

    constructor(fn: string, ln: string, email: string, un: string, pw: string) {
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.username = un;
        this.password = pw;
    }

}
