import { Typography } from "@material-ui/core";
import { mount, shallow } from "enzyme";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import RegisterComponent from "../components/RegisterComponent";
import { registerNewUser } from "../remote/user-service";

jest.mock("../remote/user-service.ts");

describe("RegisterComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("RegisterComponent renders successfully", () => {
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);

        expect(wrapper).toBeTruthy();
    });

    it("Renders the register header", () => {
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);
        
        const expectedHeader = <Typography align="center" variant="h4">Register for a DeltaForce News Account!</Typography>

        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });

    it("Input fields start as empty", () => {
        let mockUser = undefined;

        const wrapper = shallow(<RegisterComponent currentUser={mockUser}/>);

        let firstNameInput = wrapper.find("#firstName");
        let lastNameInput = wrapper.find("#lastName");
        let emailInput = wrapper.find("#email");
        let usernameInput = wrapper.find("#username");
        let passwordInput = wrapper.find("#password");

        expect(firstNameInput.text()).toBe("");
        expect(lastNameInput.text()).toBe("");
        expect(emailInput.text()).toBe("");
        expect(usernameInput.text()).toBe("");
        expect(passwordInput.text()).toBe("");
    });

    it("Error message given empty fields", () => {
        let mockUser = undefined;

        const wrapper = mount(<RegisterComponent currentUser={mockUser}/>);

        let registerBtn = wrapper.find("#register-button").at(0);

        registerBtn.simulate("click");

        let expectedErrorComponent = <ErrorMessageComponent errorMessage="You need to complete the registration form!"/>;

        expect(wrapper.contains(expectedErrorComponent)).toBe(true);
    });

    it("Clicking register with valid fields", () => {
        let mockUser = undefined;

        const wrapper = mount(<RegisterComponent currentUser={mockUser}/>);

        let firstNameInput = wrapper.find("#firstName").at(0).find("input");
        let lastNameInput = wrapper.find("#lastName").at(0).find("input");
        let emailInput = wrapper.find("#email").at(0).find("input");
        let usernameInput = wrapper.find("#username").at(0).find("input");
        let passwordInput = wrapper.find("#password").at(0).find("input");

        let registerBtn = wrapper.find("#register-button").at(0);

        firstNameInput.simulate("change", {target: {name: "firstName", value: "test-firstname"}});
        lastNameInput.simulate("change", {target: {name: "lastName", value: "test-lastname"}});
        emailInput.simulate("change", {target: {name: "email", value: "test-email"}});
        usernameInput.simulate("change", {target: {name: "username", value: "test-username"}});
        passwordInput.simulate("change", {target: {name: "password", value: "test-password"}});

        registerBtn.simulate("click");

        expect(registerNewUser).toBeCalledTimes(1);
    });
});