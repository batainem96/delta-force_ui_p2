import { Principal } from "../dtos/principal";
import { deltaforceClient } from "../remote/deltaforce-client";

export const authenticate = async(credentials: {username: string, password: string}) => {

    let resp = await deltaforceClient.post('/auth', credentials);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    let token: string | null = resp.headers.get('Authorization');

    let principal: Principal = await resp.data;
    console.log(principal)
    if(token && principal) principal.token = token;

    return principal;

}