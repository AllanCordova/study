import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSettings } from "@/context/SettingsContext";
import { SettingsModal } from "@/components/SettingsModal";

jest.mock("/context/SettingsContext", () => ({
  useSettings: jest.fn(),
}));

describe("SettingsModal Component", () => {
  const mockCloseSettings = jest.fn();
  const mockUpdateFocusTime = jest.fn();
  const mockUpdateBreakTime = jest.fn();

  const setupMock = (
    isOpen: boolean = true,
    focusMinutes: number = 25,
    breakMinutes: number = 5,
  ) => {
    (useSettings as jest.Mock).mockReturnValue({
      isSettingsOpen: isOpen,
      focusMinutes,
      breakMinutes,
      closeSettings: mockCloseSettings,
      updateFocusTime: mockUpdateFocusTime,
      updateBreakTime: mockUpdateBreakTime,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isSettingsOpen is false", () => {
    setupMock(false);
    render(<SettingsModal />);
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("should render correctly with default values", () => {
    setupMock(true, 25, 5);
    render(<SettingsModal />);

    expect(screen.getByText("Settings")).toBeInTheDocument();

    expect(screen.getByTestId("focus-display-value")).toHaveTextContent(
      "25 min",
    );
    expect(screen.getByTestId("break-display-value")).toHaveTextContent(
      "5 min",
    );
  });

  it("should call closeSettings when clicking the X button", () => {
    setupMock(true);
    render(<SettingsModal />);

    const closeButton = screen.getByLabelText("Close settings");
    fireEvent.click(closeButton);

    expect(mockCloseSettings).toHaveBeenCalledTimes(1);
  });

  it("should call updateFocusTime when clicking a preset button", () => {
    setupMock(true);
    render(<SettingsModal />);

    const preset45 = screen.getByRole("button", { name: /45 min/i });

    fireEvent.click(preset45);

    expect(mockUpdateFocusTime).toHaveBeenCalledWith(45);
  });

  it("should call updateBreakTime when changing the range slider", () => {
    setupMock(true);
    render(<SettingsModal />);

    const breakSlider = screen.getByLabelText("Break Duration Slider");

    fireEvent.change(breakSlider, { target: { value: "15" } });

    expect(mockUpdateBreakTime).toHaveBeenCalledWith(15);
  });
});
