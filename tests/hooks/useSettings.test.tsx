import React from "react";
import { renderHook, act } from "@testing-library/react";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";

describe("SettingsContext & useSettings", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SettingsProvider>{children}</SettingsProvider>
  );

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.focusMinutes).toBe(25);
    expect(result.current.breakMinutes).toBe(5);
    expect(result.current.isSettingsOpen).toBe(false);
  });

  it("should toggle settings visibility (open/close)", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.openSettings();
    });
    expect(result.current.isSettingsOpen).toBe(true);

    act(() => {
      result.current.closeSettings();
    });
    expect(result.current.isSettingsOpen).toBe(false);
  });

  it("should update focus and break times correctly", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updateFocusTime(50);
      result.current.updateBreakTime(10);
    });

    expect(result.current.focusMinutes).toBe(50);
    expect(result.current.breakMinutes).toBe(10);
  });

  it("should throw an error when used outside of SettingsProvider", () => {
    expect(() => renderHook(() => useSettings())).toThrow(
      "useSettings must be used within a SettingsProvider",
    );
  });
});
