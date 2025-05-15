import Spinner from "./spinner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Spinner", () => {
  it("Shows a loading spinner SVG image", () => {
    render(<Spinner />);
    const svgElement = screen.getByRole("status");
    expect(svgElement).toBeInTheDocument();
  });
});
