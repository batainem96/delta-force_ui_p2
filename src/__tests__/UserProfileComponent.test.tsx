import {Principal} from "../dtos/principal";
import {shallow} from "enzyme";
import UserProfileComponent from "../components/UserProfileComponent";
import {Typography} from "@material-ui/core";

jest.mock("../remote/user-service");

describe("UserProfileComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders successfully", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "valid", favTopics: []};
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<UserProfileComponent currentUser={mockUser} setCurrentUser={setMockUserFn}/>);

        expect(wrapper).toBeTruthy();
    });

    it("renders the expected header", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "valid", favTopics: []};
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<UserProfileComponent currentUser={mockUser} setCurrentUser={setMockUserFn}/>);

        const expectedHeader = <Typography align="center" variant="h4">Your Profile!</Typography>;

        expect(wrapper.contains(expectedHeader)).toBe(true);
    });

});