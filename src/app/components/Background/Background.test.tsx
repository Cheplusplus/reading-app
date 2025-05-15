import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Background from "./Background";

describe("Background", () => {
  it("Shows the background image", () => {
    render(<Background />);
    const backgroundImage = screen.getByTestId("background");
    expect(backgroundImage).toBeVisible();
  });
});
