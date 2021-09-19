import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const cities: any[] = [
  {
    city: "Paris",
    country: "France",
  },
  {
    city: "Berlin",
    country: "German",
  },
  {
    city: "Tokyo",
    country: "Japan",
  },
];

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

  it("test axios request", async () => {
    mockedAxios.get.mockResolvedValue({ data: { data: cities } });
    await act(async () => {
      render(<App />);
    });

    const fetchBtn = screen.getByRole("button");
    expect(fetchBtn).toBeInTheDocument();

    await act(async () => {
      userEvent.click(fetchBtn);
    });

    const listCities = screen.getByTestId("cities");

    expect(listCities).toBeInTheDocument();
    const { getAllByRole } = within(listCities);

    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(cities.length);
  });
});
