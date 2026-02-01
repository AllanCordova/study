import { Footer } from "@/components/ui/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer component tests", () => {
  it("test copy is render", () => {
    render(<Footer />);
    const copy = screen.getByTestId("copy");
    expect(copy).toBeInTheDocument();
  });

  it("test year is show", () => {
    render(<Footer />);
    const date = new Date().getFullYear();
    expect(screen.getByTestId("copy")).toHaveTextContent(`${date}`);
  });
});
