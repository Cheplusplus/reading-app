import "@testing-library/jest-dom";
import ToggleThemeButton from "./ToggleThemeButton";
import { render, screen } from "@testing-library/react";

describe("ToggleThemeButton", () => {
  it("Toggles the data-theme property of the body when pressed", () => {
    let theme = "dark";
    const setTheme = () => {
      theme = theme === "light" ? "dark" : "light";
    };
    const { rerender } = render(<ToggleThemeButton setTheme={setTheme} theme={theme} />);

    const button = screen.getByRole("button");
    button.click();
    expect(theme).toBe("light");
    rerender(<ToggleThemeButton setTheme={setTheme} theme={theme} />);
    button.click();
    expect(theme).toBe("dark");
  });
});
