import { PresetButton } from "@/components/timmer/PresetButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Test presetbutton component", () => {
  it("should call onClick with the correct value when clicked", () => {
    const toggleFunction = jest.fn();
    const testValue = 60;

    render(
      <PresetButton
        currentValue={10}
        onClick={toggleFunction}
        value={testValue}
      />,
    );

    const button = screen.getByRole("button", { name: /60 min/i });
    fireEvent.click(button);
    expect(toggleFunction).toHaveBeenCalledTimes(1);
    expect(toggleFunction).toHaveBeenCalledWith(testValue);
  });
});
