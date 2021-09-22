import {Typography} from "@material-ui/core";
import {shallow} from "enzyme";
import DashboardComponent from "../components/DashboardComponent";
import {Principal} from "../dtos/principal";
import {ArticleQuery} from "../models/acticle-query";

jest.mock("../remote/article-service.ts");

describe("DashboardComponent Test Suite", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("DashboardComponents renders successfully", () => {
        let mockUser = undefined;
        let mockQuery = undefined;
        let setMockQueryFn = jest.fn();
        const wrapper = shallow(<DashboardComponent currentUser={mockUser} searchQuery={mockQuery}
                                                    setSearchQuery={setMockQueryFn}/>);
        expect(wrapper).toBeTruthy();
    });

    it("Renders the home page when no user is logged in", () => {
        let mockUser = undefined;
        let mockQuery = undefined;
        let setMockQueryFn = jest.fn();
        const wrapper = shallow(<DashboardComponent currentUser={mockUser} searchQuery={mockQuery}
                                                    setSearchQuery={setMockQueryFn}/>);
        const expectedHeader = <Typography variant="h4">Welcome to DeltaForce News!</Typography>;
        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });

    it("Renders the user dashboard when user is logged in", () => {
        let mockUser: Principal = {id: "valid", username: "valid", token: "valid", role: "valid", favTopics: []}
        let mockQuery: ArticleQuery = {queryType: "valid", query: "valid"};
        let setMockQueryFn = jest.fn();
        const wrapper = shallow(<DashboardComponent currentUser={mockUser} searchQuery={mockQuery}
                                                    setSearchQuery={setMockQueryFn}/>);
        const expectedHeader = <Typography variant="h4">Welcome, valid!</Typography>;
        expect(wrapper.contains(expectedHeader)).toEqual(true);
    });

});