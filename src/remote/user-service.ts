import {RegisterUserRequest} from "../dtos/register-user-request";
import {UserNewNameRequest} from "../dtos/user-new-name-request";
import {UserNewEmailRequest} from "../dtos/user-new-email-request";
import {deltaforceClient} from "./deltaforce-client";
import {UserNewUsernameRequest} from "../dtos/user-new-username-request";
import {UserNewPassRequest} from "../dtos/user-new-pass-request";

export const getUserById = async (id: string | undefined) => {
    let resp = await deltaforceClient.get(`/user/${id}`)
    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    return resp.data;
};

export const registerNewUser = async (newUser: RegisterUserRequest) => {
    let resp = await deltaforceClient.post('/user', newUser);
    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
};


export const updateName = async (newName: UserNewNameRequest) => {
    return deltaforceClient.put('/user/edit/userinfo', newName)
        .then((resp) => {
            return resp.data;
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                // throw(error.response.data);
                throw(error.response.status);

            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);

            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);

            }
        });
};

export const updateEmail = async (newEmail: UserNewEmailRequest) => {
    return deltaforceClient.put('/user/edit/email', newEmail)
        .then((resp) => {
            return resp.data;
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                // throw(error.response.data);
                throw(error.response.status);

            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);

            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);

            }
        });
};

export const updateUsername = async (newUsername: UserNewUsernameRequest) => {
    return deltaforceClient.put('/user/edit/username', newUsername)
        .then((resp) => {
            return resp.data;
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                // throw(error.response.data);
                throw(error.response.status);

            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);

            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);

            }
        });
};

export const updatePass = async (newPass: UserNewPassRequest) => {
    return deltaforceClient.put('/user/edit/password', newPass)
        .then((resp) => {
            return resp.data;
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                // throw(error.response.data);
                throw(error.response.status);

            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);

            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);

            }
        });
};

export const banUser = async (username: string) => {
    await deltaforceClient.delete(`/user/${username}`)
};

export const addFavorite = async (uid: string | undefined, favorite: string) => {
    let resp = await deltaforceClient.post(`/user/${uid}/faves?add=${favorite}`)
    return resp.data;
}

export const removeFavorite = async (uid: string | undefined, favorite: String | string) => {
    let resp = await deltaforceClient.delete(`/user/${uid}/faves?remove=${favorite}`)
    return resp.data;
}