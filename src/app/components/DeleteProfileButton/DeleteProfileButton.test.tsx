import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteProfileButton from "./DeleteProfileButton";

let toggle = false;
beforeEach(() => {
  render(<DeleteProfileButton handleDeleteProfile={deleteProfile} />);
  window.confirm = jest.fn(() => toggle); // Replace confirm with mock
  toggle = !toggle;
});

let deleteProfileDidRun = false;
const deleteProfile = async () => {
  deleteProfileDidRun = !deleteProfileDidRun;
};

describe("DeleteProfileButton.tsx", () => {
  it("Calls deleteProfile server function", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(deleteProfileDidRun).toBe(true);
  });
  it("Doesn't call deleteProfile server function", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(deleteProfileDidRun).toBe(true);
  });
  it("Calls deleteProfile server function", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(deleteProfileDidRun).toBe(false);
  });
});
