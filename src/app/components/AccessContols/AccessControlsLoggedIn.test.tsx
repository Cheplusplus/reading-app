import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccessControls from "./AccessControls";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  ...jest.requireActual("@auth0/nextjs-auth0/client"),
  useUser: () => ({
    user: { name: "Test User", picture: "https://accounts.google.com/SignOutOptions?hl=en&continue=https://mail.google.com/mail/&service=mail&ec=GBRAFw" },
    error: null,
    isLoading: false,
  }),
}));

describe("AccessControls", () => {
  it("Contains the login button and the users profile picture.", () => {
    render(<AccessControls toggleImage={true} />);
    const logout = screen.getByTestId("logout");
    const profileImage = screen.getByTestId("profile-image");
    expect(logout).toBeVisible();
    expect(profileImage).toBeVisible();
  });
});
