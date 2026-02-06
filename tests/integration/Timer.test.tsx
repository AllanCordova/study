import { Timer } from "@/components/timmer/Timer";
import { useTimer } from "@/hooks/useTimer";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("/hooks/useTimer");

describe("Timer commponent test", () => {
  const mockData = 1000;

  const useMock = useTimer as jest.Mock;

  it("test if timmer toggle betwen start and stop", () => {
    const toggleFunction = jest.fn();
    useMock.mockReturnValue({
      timeLeft: mockData,
      isActive: true,
      progressPercentage: 20,
      toggleTimer: toggleFunction,
      resetTimer: jest.fn(),
    });

    render(<Timer seconds={mockData} mode="focus" />);
    const button = screen.getByRole("button", { name: /PAUSE/i });
    fireEvent.click(button);

    expect(toggleFunction).toHaveBeenCalled();
  });

  it("test if data is coret format show", () => {
    render(<Timer seconds={mockData} mode="focus" />);
    const time = screen.getByTestId("timer-data");
    expect(time).toHaveTextContent("16:40");
  });

  it("test if rest button is work", () => {
    const resetFunction = jest.fn();
    useMock.mockReturnValue({
      timeLeft: mockData,
      isActive: true,
      progressPercentage: 20,
      toggleTimer: jest.fn(),
      resetTimer: resetFunction,
    });

    render(<Timer seconds={mockData} mode="focus" />);

    const button = screen.getByRole("button", { name: /RESET/i });
    fireEvent.click(button);

    expect(resetFunction).toHaveBeenCalled();
  });
});
