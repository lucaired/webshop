import { screen } from "@testing-library/react";
import { render } from "../../../Utils/testUtils";
import NavBar from "../NavBar";
import { LocalUser } from "../../../Store/user";

describe("NavBar", () => {
  it("should render the NavBar component and show SIGN IN if the is no current user", () => {
    render(<NavBar />, {
      initialState: {
        user: {
          currentUser: null,
        },
      },
    });
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByText("SIGN IN")).toBeInTheDocument();
  });

  it("should render the NavBar component and show SIGN OUT if there is a current user", () => {
    render(<NavBar />, {
      initialState: {
        user: {
          currentUser: new LocalUser("Test User", "test@test.com", true),
        },
      },
    });
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByText("SIGN IN")).toBeInTheDocument();
  });
});
