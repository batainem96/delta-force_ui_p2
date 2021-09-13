import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { mount, shallow } from "enzyme";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import LoginComponent from "../components/LoginComponent";
import { authenticate } from "../remote/auth-service";

jest.mock("../remote/auth-service");

describe("LoginComponent Test Suite", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("LoginComponent renders successfully", () => {
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        expect(wrapper).toBeTruthy();
    });

    it("Renders the login header", () => {
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        const expectedHeader = <Typography align="center" variant="h4">Login</Typography>

        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });

    it("Username and password fields start empty", () => {
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let usernameInputWrapper = wrapper.find("#username-input");
        let passwordInputWrapper = wrapper.find("#password-input");

        expect(usernameInputWrapper.text()).toBe("");
        expect(passwordInputWrapper.text()).toBe("");
    });

    it("Clicking login button with missing form field will display error message", () => {
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let loginBtnWrapper = wrapper.find("#login-bt").at(0);

        loginBtnWrapper.simulate("click");

        let expectedErrorComponent = <ErrorMessageComponent errorMessage="You need to provide a username and password"/>;

        expect(wrapper.contains(expectedErrorComponent)).toBe(true);
    });

    it("Clicking login button with valid username and password attempts to login", () => {
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let usernameInput = wrapper.find("#username-input").at(0).find("input");
        let passwordInput = wrapper.find("#password-input").at(0).find("input");
        let loginBtn = wrapper.find("#login-bt").at(0);

        usernameInput.simulate("change", {target: {name: "username", value: "test-username"}});
        passwordInput.simulate("change", {target: {name: "password", value: "test-password"}});

        loginBtn.simulate("click");

        expect(authenticate).toBeCalledTimes(1);
    });
});