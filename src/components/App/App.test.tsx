import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App component:", () => {
  it("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/test application/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("search work correctly", () => {
    render(<App />);

    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();

    userEvent.type(inputElem, "script");
    expect(screen.queryByText(/javascript/i)).toBeInTheDocument();
    expect(screen.queryByText(/typescript/i)).toBeInTheDocument();
    expect(screen.queryByText(/SCSS/i)).not.toBeInTheDocument();
  });
});
