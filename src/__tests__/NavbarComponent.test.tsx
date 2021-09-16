import { Typography } from "@material-ui/core";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import NavbarComponent from "../components/NavbarComponent";
import { Principal } from "../dtos/principal";
import {ArticleQuery} from "../models/acticle-query";

describe("NavbarComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders successfully", () => {
        let mockUser = undefined;
        let setMockUserFn = jest.fn();
        let mockQuery = undefined;
        let setMockQueryFn = jest.fn();

        const wrapper = shallow(<NavbarComponent currentUser={mockUser} setCurrentUser={setMockUserFn} searchQuery={mockQuery} setSearchQuery={setMockQueryFn}/>);

        expect(wrapper).toBeTruthy();
    });

    it("renders the expected header", () => {
        let mockUser = undefined;
        let setMockUserFn = jest.fn();
        let mockQuery = undefined;
        let setMockQueryFn = jest.fn();

        const wrapper = shallow(<NavbarComponent currentUser={mockUser} setCurrentUser={setMockUserFn} searchQuery={mockQuery} setSearchQuery={setMockQueryFn}/>);

        const expectedHeader = "DeltaForce News"

        expect(wrapper.contains(expectedHeader)).toBe(true);
    });

    it("displays the correct dropdown menu when no user logged in", () => {
        let mockUser = undefined;
        let setMockUserFn = jest.fn();
        let mockQuery = undefined;
        let setMockQueryFn = jest.fn();

        const wrapper = shallow(<NavbarComponent currentUser={mockUser} setCurrentUser={setMockUserFn} searchQuery={mockQuery} setSearchQuery={setMockQueryFn}/>);

        const loginItem = "Login";
        const registerItem = "Register";

        const profileItem = "My Profile";
        const logoutItem = "Log out";

        expect(wrapper.contains(loginItem)).toBe(true);
        expect(wrapper.contains(registerItem)).toBe(true);

        expect(wrapper.contains(profileItem)).toBe(false);
        expect(wrapper.contains(logoutItem)).toBe(false);
    });

    it("displays the correct dropdown menu when user is logged in", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "valid", favTopics: []};
        let setMockUserFn = jest.fn();
        let mockQuery: ArticleQuery = {queryType: "valid", query: "valid"};
        let setMockQueryFn = jest.fn();

        const wrapper = shallow(<NavbarComponent currentUser={mockUser} setCurrentUser={setMockUserFn} searchQuery={mockQuery} setSearchQuery={setMockQueryFn}/>);

        const profileItem = "My Profile";
        const logoutItem = "Log out";

        const loginItem = "Login";
        const registerItem = "Register";

        expect(wrapper.contains(profileItem)).toBe(true);
        expect(wrapper.contains(logoutItem)).toBe(true);

        expect(wrapper.contains(loginItem)).toBe(false);
        expect(wrapper.contains(registerItem)).toBe(false);
    });
});