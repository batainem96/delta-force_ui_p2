import {Credentials} from "../dtos/credentials";
import {deltaforceClient} from "./deltaforce-client";
import {Principal} from "../dtos/principal";


export const authenticate = async (credentials: Credentials) => {

    let resp = await deltaforceClient.post('/auth', credentials);

    if (resp.status === 401) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    console.log(resp.headers['authorization']);

    deltaforceClient.defaults.headers["Authorization"] = localStorage.getItem("api-token");

    return resp.data;

}

export const logout = (setCurrentUser: (nextUser: Principal | undefined) => void) => {
    deltaforceClient.defaults.headers["Authorization"] = undefined;
    localStorage.removeItem('api-token')
    setCurrentUser(undefined);
}
