export class GetUserRequest {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;

    constructor(id: string, fn: string, ln: string, email: string, un: string, pw: string) {
        this.id = id;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.username = un;
        this.password = pw;
    }

}