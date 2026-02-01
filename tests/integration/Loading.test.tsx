import { Loading } from "@/components/ui/Loading";
import { render, screen } from "@testing-library/react";

describe("test loading component", () => {
  it("test text component is render", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
