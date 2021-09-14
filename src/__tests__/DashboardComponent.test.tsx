import { Typography } from "@material-ui/core";
import { shallow } from "enzyme";
import DashboardComponent from "../components/DashboardComponent";
import { Principal } from "../dtos/principal";

jest.mock("../remote/article-service.ts");

describe("DashboardComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("DashboardComponents renders successfully", () => {
        let mockUser = undefined;
        const wrapper = shallow(<DashboardComponent currentUser={mockUser}/>);
        expect(wrapper).toBeTruthy();
    });

    it("Renders the home page when no user is logged in", () => {
        let mockUser = undefined;
        const wrapper = shallow(<DashboardComponent currentUser={mockUser}/>);
        const expectedHeader = <Typography variant="h4">Welcome to DeltaForce News!</Typography>;
        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });

    it("Renders the user dashboard when user is logged in", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", favTopics: []};
        const wrapper = shallow(<DashboardComponent currentUser={mockUser}/>);
        const expectedHeader = <Typography variant="h4">Welcome, valid!</Typography>;
        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });
    
});