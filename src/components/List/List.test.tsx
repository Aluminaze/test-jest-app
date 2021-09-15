import List from ".";
import { render, screen, within } from "@testing-library/react";
import { listData } from "TestData/ListData";

describe("List Component", () => {
  it("Render test with no-data", () => {
    render(<List items={[]} />);

    expect(screen.queryByRole("list")).toBeNull();
  });

  it("Render test with empty string data", () => {
    render(<List items={[""]} />);

    expect(screen.queryByRole("list")).toBeInTheDocument();
  });

  it("Render test with data", () => {
    render(<List items={listData} />);

    expect(screen.getByRole("list")).toBeInTheDocument();

    const list = screen.getByRole("list");

    const { getAllByRole } = within(list);
    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(listItems.length);
  });
});
