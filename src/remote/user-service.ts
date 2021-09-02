import {RegisterUserRequest} from "../dtos/register-user-request";
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

export const getMyProfileInfo = async () => {

}
