export class UserNewNameRequest {

    id: string | undefined;
    newFirstName: string;
    newLastName: string;
    password: string;

    constructor(id: string, fn: string, ln: string, pw: string) {
        this.id = id;
        this.newFirstName = fn;
        this.newLastName = ln;
        this.password = pw;
    }

}