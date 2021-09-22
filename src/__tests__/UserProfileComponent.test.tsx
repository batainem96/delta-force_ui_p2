import {Principal} from "../dtos/principal";
import {shallow} from "enzyme";
import UserProfileComponent from "../components/UserProfileComponent";
import {Typography} from "@material-ui/core";
import React from "react";

jest.mock("../remote/user-service");

describe("UserProfileComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders successfully", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "valid", favTopics: []};
        let setMockUserFn = jest.fn();
        let mockUserInfo = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        let setMockUserInfoFn = jest.fn();

        const wrapper = shallow(<UserProfileComponent currentUser={mockUser} setCurrentUser={setMockUserFn} userInfo={mockUserInfo} setUserInfo={setMockUserInfoFn} />);

        expect(wrapper).toBeTruthy();
    });

    it("renders the expected header", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "valid", favTopics: []};
        let setMockUserFn = jest.fn();
        let mockUserInfo = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        let setMockUserInfoFn = jest.fn();

        const wrapper = shallow(<UserProfileComponent currentUser={mockUser} setCurrentUser={setMockUserFn} userInfo={mockUserInfo} setUserInfo={setMockUserInfoFn}/>);

        const expectedHeader = <Typography align="center" variant="h4">Profile Settings</Typography>;

        expect(wrapper.contains(expectedHeader)).toBe(true);
    });

});