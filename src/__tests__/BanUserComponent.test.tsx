import {mount, shallow} from "enzyme";
import BanUserComponent from "../components/BanUserComponent";
import {TextField, Typography} from "@material-ui/core";
import {banUser} from "../remote/user-service";
import SuccessMessageComponent from "../components/SuccessMessageComponent";
import {Alert} from "@material-ui/lab";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import {act} from "@testing-library/react";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

jest.mock("../remote/user-service");

describe("BanUserComponent Test Suite", () => {

    afterEach(() => {
       jest.resetAllMocks();
    });

    it("renders successfully", () => {
        let mockUser = {
            id: "valid",
            username: "valid",
            token: "valid",
            role: "valid",
            favTopics: []
        };
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<BanUserComponent currentUser={mockUser} setCurrentUser={setMockUserFn} />);

        expect(wrapper).toBeTruthy();
    });

    it("renders the correct header", () => {
        let mockUser = {
            id: "valid",
            username: "valid",
            token: "valid",
            role: "valid",
            favTopics: []
        };
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<BanUserComponent currentUser={mockUser} setCurrentUser={setMockUserFn} />);
        const expectedHeader = <Typography align="center" variant="h4">Banning a user...</Typography>;

        expect(wrapper.contains(expectedHeader)).toBe(true);
    });

    it("displays empty fields on first render", () => {
        let mockUser = {
            id: "valid",
            username: "valid",
            token: "valid",
            role: "valid",
            favTopics: []
        };
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<BanUserComponent currentUser={mockUser} setCurrentUser={setMockUserFn} />);

        let usernameInput = wrapper.find("#username").at(0);

        expect(usernameInput.text()).toBe("");
    });

    it("bans a user when provided valid username", () => {
        let mockUser = {
            id: "valid",
            username: "valid",
            token: "valid",
            role: "valid",
            favTopics: []
        };
        let setMockUserFn = jest.fn();

        const wrapper = mount(<BanUserComponent currentUser={mockUser} setCurrentUser={setMockUserFn} />);

        let username = wrapper.find("#username").at(0);
        let banButton = wrapper.find("#ban-button").at(0);

        username.simulate("change", {target: {name: "username", value: "test-username"}});
        banButton.simulate("click");
        expect(banUser).toBeCalledTimes(1);
    });

    it("goes back when back button is clicked", () => {
        let mockUser = {
            id: "valid",
            username: "valid",
            token: "valid",
            role: "valid",
            favTopics: []
        };
        let setMockUserFn = jest.fn();

        const wrapper = mount(<BanUserComponent currentUser={mockUser} setCurrentUser={setMockUserFn} />);

        let backButton = wrapper.find("#back-button").at(0);
        backButton.simulate("click");

        expect(mockHistoryPush).toHaveBeenCalledWith("/admin-dashboard");
    });
});