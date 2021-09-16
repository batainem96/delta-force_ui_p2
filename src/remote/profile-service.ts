import {RegisterUserRequest} from "../dtos/register-user-request";
import {deltaforceClient} from "./deltaforce-client";


export const editProfile = async (editInfo: RegisterUserRequest) => {

    let resp = await deltaforceClient.post('/auth', editInfo);

    if (resp.status === 401) {
        throw resp.data;
    }
};

export const getInfor = async () => {

}