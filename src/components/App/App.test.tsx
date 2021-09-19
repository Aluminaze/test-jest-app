import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("App component:", () => {
  it("renders learn react link", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.queryByText(/test application/i)).toBeInTheDocument();
    expect(screen.queryByText(/logged in as:/i)).toBeInTheDocument();
  });

  it("search work correctly", async () => {
    await act(async () => {
      render(<App />);
    });

    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();

    userEvent.type(inputElem, "script");
    expect(screen.queryByText(/javascript/i)).toBeInTheDocument();
    expect(screen.queryByText(/typescript/i)).toBeInTheDocument();
    expect(screen.queryByText(/SCSS/i)).not.toBeInTheDocument();
  });
});
