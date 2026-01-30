import { renderHook, act } from "@testing-library/react";
import { MetricsProvider, useMetrics } from "@/context/MetricsContext";
import { metricsService } from "@/services/metricsService";

jest.mock("/services/metricsService", () => ({
  metricsService: {
    getHistory: jest.fn(),
    saveSession: jest.fn(),
  },
}));

describe("MetricsContext & useMetrics", () => {
  const mockHistory = [
    { id: "1", duration: 1500, type: "focus", date: new Date().toISOString() },
    { id: "2", duration: 300, type: "break", date: new Date().toISOString() },
    { id: "3", duration: 1500, type: "focus", date: new Date().toISOString() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (metricsService.getHistory as jest.Mock).mockReturnValue(mockHistory);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MetricsProvider>{children}</MetricsProvider>
  );

  it("should initialize with history from metricsService", () => {
    const { result } = renderHook(() => useMetrics(), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.sessions).toEqual(mockHistory);
    expect(metricsService.getHistory).toHaveBeenCalledTimes(1);
  });

  it("should calculate focus and break cycles correctly", () => {
    const { result } = renderHook(() => useMetrics(), { wrapper });

    expect(result.current.focusCycles).toBe(2);
    expect(result.current.breakCycles).toBe(1);
  });

  it("should register a new session and update state", () => {
    const newSession = {
      id: "4",
      duration: 1500,
      type: "focus",
      date: new Date().toISOString(),
    };

    (metricsService.getHistory as jest.Mock)
      .mockReturnValueOnce(mockHistory)
      .mockReturnValueOnce([...mockHistory, newSession]);

    const { result } = renderHook(() => useMetrics(), { wrapper });

    act(() => {
      result.current.registerSession(1500, "focus");
    });

    expect(metricsService.saveSession).toHaveBeenCalledWith(1500, "focus");
    expect(result.current.sessions.length).toBe(4);
    expect(result.current.focusCycles).toBe(3);
  });

  it("should start with isLoading as true then false", () => {
    const { result } = renderHook(() => useMetrics(), { wrapper });
    expect(result.current.isLoading).toBe(false);
  });
});
