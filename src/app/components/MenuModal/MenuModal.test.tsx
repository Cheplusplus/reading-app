import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuModal from "./MenuModal";
import { useState } from "react";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  ...jest.requireActual("@auth0/nextjs-auth0/client"),
  useUser: () => ({
    user: { name: "Test User" },
    error: null,
    isLoading: false,
  }),
}));

describe("MenuModal", () => {
  it("Has all the navigation links and buttons", () => {
    const { result } = renderHook(() => useState(true));

    const { rerender } = render(<MenuModal state={result.current[0]} setState={result.current[1]} />);
    const container = screen.getByTestId("container");
    const theme = screen.getByTestId("theme");
    const home = screen.getByTestId("home");
    const accessControls = screen.getByTestId("access-controls");
    const read = screen.getByTestId("read");
    const roadmap = screen.getByTestId("roadmap");
    const profile = screen.getByTestId("profile");

    const button = screen.getByRole("button", { name: "close" });

    expect(container.classList.contains("menu_container")).toBe(true);
    expect(container.classList.contains("hidden")).not.toBe(true);

    expect(theme).toBeVisible();
    expect(home).toBeVisible();
    expect(accessControls).toBeVisible();
    expect(read).toBeVisible();
    expect(roadmap).toBeVisible();
    expect(profile).toBeVisible();

    fireEvent.click(button);
    rerender(<MenuModal state={result.current[0]} setState={result.current[1]} />);
    expect(result.current[0]).toBe(false);
    expect(container.classList.contains("hidden")).toBe(true);
  });
});
