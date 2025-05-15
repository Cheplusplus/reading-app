import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer.tsx", () => {
  it("Shows the footer", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeVisible();
  });
});
