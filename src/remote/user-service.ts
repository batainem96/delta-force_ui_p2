import {RegisterUserRequest} from "../dtos/register-user-request";
import { UserNewNameRequest } from "../dtos/user-new-name-request";
import { UserNewEmailRequest } from "../dtos/user-new-email-request";
import {deltaforceClient} from "./deltaforce-client";
import { UserNewUsernameRequest } from "../dtos/user-new-username-request";
import { UserNewPassRequest } from "../dtos/user-new-pass-request";


// export const getAllUsers = async () => {

//     let resp = await deltaforceClient.get('/users');

//     if (resp.status >= 400 && resp.status <= 599)
//         throw resp.data;

// };

export const registerNewUser = async (newUser: RegisterUserRequest) => {

    let resp = await deltaforceClient.post('/register', newUser);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

};


export const updateName = async (newName:  UserNewNameRequest) => {

    let resp = await deltaforceClient.put('/user/edit/userinfo', newName);
};

export const updateEmail = async (newEmail: UserNewEmailRequest) => {

    let resp = await deltaforceClient.put('/user/edit/email', newEmail);
};

export const updateUsername = async (newUsername: UserNewUsernameRequest) => {

    let resp = await deltaforceClient.put('/user/edit/username', newUsername);
};

export const updatePass = async (newPass: UserNewPassRequest) => {

    let resp = await deltaforceClient.put('/user/edit/password', newPass);
};

export const banUser = async (username: string ) => {

    let resp = await deltaforceClient.delete(`/user/${username}`)
};