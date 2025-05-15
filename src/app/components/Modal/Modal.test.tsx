import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal", () => {
  it("Displays a modal element to display child elements", async () => {
    const { rerender } = render(<Modal buttonContent="Test" />);
    const modal_container = screen.getByTestId("modal-container");
    const modal = screen.getByTestId("modal");
    const buttons = screen.getAllByRole("button");
    expect(modal_container).toBeInTheDocument();
    expect(buttons[0].textContent).toBe("Test");
    expect(modal.classList.contains("hide")).toBe(true);
    act(() => buttons[0].click());
    expect(modal.classList.contains("container")).toBe(true);
    act(() => buttons[1].click());
    expect(modal.classList.contains("hide")).toBe(true);
  });
});
