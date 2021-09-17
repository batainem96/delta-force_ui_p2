import {mount, shallow} from "enzyme";
import AdminControlPanelComponent from "../components/AdminControlPanelComponent";
import {Typography} from "@material-ui/core";
import {Principal} from "../dtos/principal";
import {act} from "@testing-library/react";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe("AdminControlPanelComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders successfully", () => {
        let mockUser = undefined;
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<AdminControlPanelComponent currentUser={mockUser} setCurrentUser={setMockUserFn}/>);

        expect(wrapper).toBeTruthy();
    });

    it("renders the correct header", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "admin", favTopics: []};
        let setMockUserFn = jest.fn();

        const wrapper = shallow(<AdminControlPanelComponent currentUser={mockUser} setCurrentUser={setMockUserFn}/>);
        const expectedHeader = <Typography align="center" variant="h4">Welcome, Commander!</Typography>;

        expect(wrapper.contains(expectedHeader)).toBe(true);
    });

    it("changes url on button click", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "admin", favTopics: []};
        let setMockUserFn = jest.fn();

        const expectedHeader = <Typography align="center" variant="h4">Banning a user...</Typography>;

        const wrapper = mount(<AdminControlPanelComponent currentUser={mockUser} setCurrentUser={setMockUserFn}/>);
        const button = wrapper.find("button").at(0);

        button.simulate("click");
        expect(mockHistoryPush).toHaveBeenCalledWith("/admin-dashboard/ban");
    });
})