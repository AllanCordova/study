import { ModeToggle } from "@/components/timmer/ModeToggle";
import { fireEvent, render, screen } from "@testing-library/react";

describe("test modeToggle component", () => {
  const onModeChangeMock = jest.fn();

  it("test button is render", () => {
    render(<ModeToggle currentMode="focus" onModeChange={onModeChangeMock} />);

    const breakButton = screen.getByRole("button", { name: "Cycles Break" });
    const focusButton = screen.getByRole("button", { name: "Cycles Focus" });

    expect(breakButton).toBeInTheDocument();
    expect(focusButton).toBeInTheDocument();
  });

  it("test toggle", () => {
    render(<ModeToggle currentMode="focus" onModeChange={onModeChangeMock} />);

    const breakButton = screen.getByRole("button", { name: "Cycles Break" });
    fireEvent.click(breakButton);

    expect(onModeChangeMock).toHaveBeenCalled();
    expect(onModeChangeMock).toHaveBeenCalledWith("break");
  });
});
