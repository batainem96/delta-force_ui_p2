import {RegisterUserRequest} from "../dtos/register-user-request";
import { UserNewNameRequest } from "../dtos/user-new-name-request";
import { UserProfileRequest } from "../dtos/user-profile-request";
import {deltaforceClient} from "./deltaforce-client";


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

export const getProfileInfo = async (profile: UserProfileRequest) => {

    let resp = await deltaforceClient.get('/user/{id}');
};
