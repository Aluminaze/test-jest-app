import List from ".";
import { render, screen } from "@testing-library/react";
import { listData } from "TestData/ListData";

describe("List Component", () => {
  it("Render test with data", () => {
    render(<List items={listData} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("Render test with no-data", () => {
    render(<List items={[]} />);

    expect(screen.queryByRole("list")).toBeNull();
  });
});
