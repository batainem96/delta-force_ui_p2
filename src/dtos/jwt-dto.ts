export class PrincipalJWT {

    jti: string;
    sub: string;
    role: string;

    constructor(jti: string, sub: string, role: string){
        this.jti = jti;
        this.sub = sub;
        this.role = role;
    }
}