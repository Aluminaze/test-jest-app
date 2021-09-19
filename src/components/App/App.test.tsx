import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("App component:", () => {
  it("renders learn react link", async () => {
    render(<App />);

    expect(screen.getByText(/test application/i)).toBeInTheDocument();
    expect(await screen.findByText(/logged in as:/i)).toBeInTheDocument();
  });

  it("search work correctly", async () => {
    render(<App />);

    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();

    userEvent.type(inputElem, "script");
    expect(await screen.findByText(/javascript/i)).toBeInTheDocument();
    expect(await screen.findByText(/typescript/i)).toBeInTheDocument();
    expect(screen.queryByText(/SCSS/i)).not.toBeInTheDocument();
  });
});
