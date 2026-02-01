import { Header } from "@/components/ui/Header";
import { useSettings } from "@/context/SettingsContext";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("/context/SettingsContext");

describe("Test Header component", () => {
  const mockUseShareImage = useSettings as jest.Mock;
  const openSettingsMock = jest.fn();

  mockUseShareImage.mockReturnValue({
    openSettings: openSettingsMock,
  });

  it("Links is showed", () => {
    render(<Header />);

    expect(screen.getByTestId("home-link")).toHaveTextContent("Pomodoro");
    expect(screen.getByTestId("metrics-link")).toHaveTextContent("Metrics");
  });

  it("test button called settings modal", () => {
    render(<Header />);

    const settingsButton = screen.getByRole("button", {
      name: "Open Settings",
    });
    fireEvent.click(settingsButton);

    expect(openSettingsMock).toHaveBeenCalled();
  });
});
