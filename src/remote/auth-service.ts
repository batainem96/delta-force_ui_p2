import {Credentials} from "../dtos/credentials";
import {deltaforceClient} from "./deltaforce-client";
import {Principal} from "../dtos/principal";

export const authenticate = async (credentials: Credentials) => {
    return deltaforceClient.post('/auth', credentials)
        .then((resp) => {
            localStorage.setItem('api-token', resp.headers['authorization']);
            deltaforceClient.defaults.headers["Authorization"] = localStorage.getItem("api-token");
            return resp.data;
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                throw(error.response.data);

            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);

            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);

            }
        });
}

export const logout = (setCurrentUser: (nextUser: Principal | undefined) => void) => {
    deltaforceClient.defaults.headers["Authorization"] = undefined;
    localStorage.removeItem('api-token')
    setCurrentUser(undefined);
}