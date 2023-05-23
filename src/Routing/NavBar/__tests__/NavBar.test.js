import { screen } from "@testing-library/react";
import { render } from "../../../Utils/testUtils";
import NavBar from "../NavBar";

describe("NavBar", () => {
    it("should render the NavBar component", () => {
        render(<NavBar />, { initialState: {
            user: {
                currentUser: null
            }
        } });
        expect(screen.getByText("HOME")).toBeInTheDocument();
        expect(screen.getByText("SHOP")).toBeInTheDocument();
        expect(screen.getByText("SIGN IN")).toBeInTheDocument();
    });
});
