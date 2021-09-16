import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "components/Search";

const onChange = jest.fn();

describe("Search component", () => {
  it("Search renders without children and placeholder", () => {
    render(<Search value={""} onChange={onChange} />);

    expect(screen.getByText(/Search:/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/start search.../)).toBeInTheDocument();
  });

  it("Search renders with children and placeholder", () => {
    render(
      <Search value={""} onChange={onChange} placeholder="go...">
        Input for search:
      </Search>
    );

    expect(screen.getByText(/input for search:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/go.../)).toBeInTheDocument();
  });

  it("Search when typing", () => {
    render(<Search value="" onChange={onChange} />);

    userEvent.type(screen.getByRole("textbox"), "script");

    expect(onChange).toHaveBeenCalledTimes(6);
  });

  it("Check input is filled", () => {
    render(<Search value="some text for searching" onChange={onChange} />);
    const inputElem = screen.getByRole("textbox");

    expect(inputElem).toHaveClass("input");
    expect(inputElem).toHaveClass("inputFilled");
  });

  it("Check input hasn't class filled", () => {
    render(<Search value="" onChange={onChange} />);
    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toHaveClass("input");
    expect(inputElem).not.toHaveClass("inputFilled");
  });
});
