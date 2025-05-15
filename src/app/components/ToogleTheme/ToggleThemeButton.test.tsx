// MyComponent.test.tsx
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import ToggleThemeButton from "./ToggleThemeButton";
import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("MyComponent", () => {
  it("updates theme when toggled", () => {
    const { getByRole } = render(
      <ThemeProvider attribute="class">
        <ToggleThemeButton />
      </ThemeProvider>
    );

    // Example: Assume your component has a button that toggles the theme
    const button = getByRole("button");

    // Click to change the theme
    fireEvent.click(button);
    expect(document.documentElement).toHaveClass("light"); // if switching to dark
    fireEvent.click(button);
    expect(document.documentElement).toHaveClass("dark"); // if switching to dark
  });
});
