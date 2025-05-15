import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccessControls from "./AccessControls";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  ...jest.requireActual("@auth0/nextjs-auth0/client"),
  useUser: () => ({
    user: null,
    error: null,
    isLoading: false,
  }),
}));

describe("AccessControls", () => {
  it("Contains the logout button", () => {
    render(<AccessControls toggleImage={false} />);
    const login = screen.getByTestId("login");
    expect(login).toBeVisible();
  });
});
