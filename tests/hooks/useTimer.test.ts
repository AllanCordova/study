import { renderHook, act } from "@testing-library/react";
import { useTimer } from "@/hooks/useTimer";
import { metricsService } from "@/services/metricsService";

jest.mock("/services/metricsService", () => ({
  metricsService: {
    saveSession: jest.fn(),
  },
}));

describe("useTimer Hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initialize with correct default values", () => {
    const initialTime = 60;
    const { result } = renderHook(() => useTimer(initialTime, "focus"));

    expect(result.current.timeLeft).toBe(60);
    expect(result.current.formattedTime).toBe("01:00");
    expect(result.current.isActive).toBe(false);
    expect(result.current.progressPercentage).toBe(0);
  });

  it("should start decreasing time when toggled on", () => {
    const { result } = renderHook(() => useTimer(60, "focus"));

    act(() => {
      result.current.toggleTimer();
    });

    expect(result.current.isActive).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(59);
    expect(result.current.formattedTime).toBe("00:59");
  });

  it("should pause the timer when toggled off", () => {
    const { result } = renderHook(() => useTimer(60, "focus"));

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.toggleTimer();
    });

    expect(result.current.isActive).toBe(false);
    const timeWhenPaused = result.current.timeLeft;

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(timeWhenPaused);
  });

  it("should reset the timer to initial state", () => {
    const { result } = renderHook(() => useTimer(60, "focus"));

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.timeLeft).toBe(50);

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.isActive).toBe(false);
    expect(result.current.timeLeft).toBe(60);
    expect(result.current.progressPercentage).toBe(0);
  });

  it("should complete the timer and save the session", () => {
    const initialTime = 5;
    const { result } = renderHook(() => useTimer(initialTime, "focus"));

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(5);
    expect(result.current.isActive).toBe(false);

    expect(metricsService.saveSession).toHaveBeenCalledTimes(1);
    expect(metricsService.saveSession).toHaveBeenCalledWith(
      initialTime,
      "focus",
    );
  });

  it("should update timeLeft if initialTimeInSeconds prop changes while inactive", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useTimer(val, "focus"),
      {
        initialProps: { val: 60 },
      },
    );

    expect(result.current.timeLeft).toBe(60);

    rerender({ val: 120 });

    expect(result.current.timeLeft).toBe(120);
    expect(result.current.formattedTime).toBe("02:00");
  });

  it("should calculate progress percentage correctly", () => {
    const initialTime = 100;
    const { result } = renderHook(() => useTimer(initialTime, "focus"));

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(25000);
    });

    expect(result.current.progressPercentage).toBe(25);
  });
});
