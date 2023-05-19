import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../Utils/testUtils";
import NavBar from "../NavBar";

describe("NavBar", () => {
    it("should render the NavBar component", () => {
        renderWithProviders(<NavBar />, {
            preloadedState: {
                auth: {
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                },
            },
        });
        expect(screen.getByText("HOME")).toBeInTheDocument();
        expect(screen.getByText("SHOP")).toBeInTheDocument();
        expect(screen.getByText("SIGN IN")).toBeInTheDocument();
    });
    }
);
