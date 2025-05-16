import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal", () => {
  it("Displays a modal element to display child elements", async () => {
    render(<Modal buttonContent="Test" />);
    const modal_container = screen.getByTestId("modal-container");
    const modal = screen.getByTestId("modal");
    const buttons = screen.getAllByRole("button");
    expect(modal_container).toBeInTheDocument();
    expect(buttons[0].textContent).toBe("Test");
    expect(modal.classList.contains("hide")).toBe(true);
    fireEvent.click(buttons[0]);
    expect(modal.classList.contains("container")).toBe(true);
    fireEvent.click(buttons[1]);
    expect(modal.classList.contains("hide")).toBe(true);
  });
});
