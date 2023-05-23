import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../Utils/testUtils";
import NavBar from "../NavBar";
import { LocalUser } from "../../../Store/user";

describe("NavBar", () => {
  it("should render the NavBar component and show SIGN IN if the is no current user", () => {
    renderWithProviders(<NavBar />);
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByText("SIGN IN")).toBeInTheDocument();
  });

  it("should render the NavBar component and show SIGN OUT if there is a current user", () => {
    renderWithProviders(<NavBar />, {
      preloadedState: {
        user: {
          currentUser: new LocalUser("Test Name", "test@†est.com", true),
        },
      },
    });
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByText("SIGN OUT")).toBeInTheDocument();
  });
});
