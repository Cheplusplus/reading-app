import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuButton from "./MenuButton";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  ...jest.requireActual("@auth0/nextjs-auth0/client"),
  useUser: () => ({
    user: { name: "Test User" },
    error: null,
    isLoading: false,
  }),
}));

describe("MenuButton", () => {
  it("Opens the MenuModal when clicked", () => {
    render(<MenuButton />);
    const menuButton = screen.getByRole("button", { name: "menu" });
    fireEvent.click(menuButton);
    const MenuModal = screen.getByTestId("container");
    expect(menuButton.textContent).toBe("menu");
    expect(MenuModal).toBeVisible();
  });
});
