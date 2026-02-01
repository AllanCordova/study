import { AchievementCard } from "@/components/AchievementCard";
import { useShareImage } from "@/hooks/useShareImage";
import { MetricsSummaryData } from "@/types/metrics";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("/hooks/useShareImage");

describe("Achievement card tests", () => {
  const mockUseShareImage = useShareImage as jest.Mock;
  const shareImageSpy = jest.fn();

  mockUseShareImage.mockReturnValue({
    captureRef: { current: document.createElement("div") },
    isSharing: false,
    error: null,
    shareImage: shareImageSpy,
  });

  const mockData: MetricsSummaryData = {
    totalFocusSessions: 2,
    totalBreakSeconds: 20,
    totalBreakSessions: 1,
    totalFocusSeconds: 1200,
  };

  it("test if card show correct data", () => {
    render(<AchievementCard data={mockData} />);
    expect(screen.getByTestId("focus-data-sessions")).toHaveTextContent(
      `${mockData.totalFocusSessions}`,
    );
  });

  it("test corect format time display", () => {
    render(<AchievementCard data={mockData} />);
    expect(screen.getByTestId("focus-data-display")).toHaveTextContent(`20m`);
  });

  it("function is called when button is click", () => {
    mockUseShareImage.mockReturnValue({
      captureRef: { current: document.createElement("div") },
      isSharing: false,
      error: null,
      shareImage: shareImageSpy,
    });

    render(<AchievementCard data={mockData} />);

    const shareButton = screen.getByRole("button", {
      name: /Share Achievement/i,
    });
    fireEvent.click(shareButton);

    expect(shareImageSpy).toHaveBeenCalled();
  });

  it("loading when image is generate", () => {
    mockUseShareImage.mockReturnValue({
      captureRef: { current: document.createElement("div") },
      isSharing: true,
      error: null,
      shareImage: shareImageSpy,
    });

    render(<AchievementCard data={mockData} />);

    expect(screen.getByRole("button")).toHaveTextContent("Generating image...");
  });
});
