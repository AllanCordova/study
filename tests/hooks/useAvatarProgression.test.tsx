import { renderHook, waitFor } from "@testing-library/react";
import { useAvatarProgression } from "@/hooks/useAvatarProgression";
import { useMetrics } from "@/context/MetricsContext";

jest.mock("/context/MetricsContext", () => ({
  useMetrics: jest.fn(),
}));

const mockPersons = [
  { id: "1", name: "Novice", level: 0, avatarUrl: "/1.png" },
  { id: "2", name: "Apprentice", level: 5, avatarUrl: "/2.png" },
  { id: "3", name: "Master", level: 10, avatarUrl: "/3.png" },
];

describe("useAvatarProgression Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPersons),
      }),
    ) as jest.Mock;
  });

  it("should return loading state while metrics are loading", () => {
    (useMetrics as jest.Mock).mockReturnValue({
      focusCycles: 0,
      isLoading: true,
    });

    const { result } = renderHook(() => useAvatarProgression());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentAvatar).toBeNull();
  });

  it("should set the first person as current if focusCycles is 0", async () => {
    (useMetrics as jest.Mock).mockReturnValue({
      focusCycles: 0,
      isLoading: false,
    });

    const { result } = renderHook(() => useAvatarProgression());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.currentAvatar?.level).toBe(0);
    expect(result.current.nextAvatar?.level).toBe(5);
    expect(result.current.userCycles).toBe(0);
  });

  it("should unlock higher level avatars based on focusCycles", async () => {
    (useMetrics as jest.Mock).mockReturnValue({
      focusCycles: 6,
      isLoading: false,
    });

    const { result } = renderHook(() => useAvatarProgression());

    await waitFor(() => {
      expect(result.current.currentAvatar?.name).toBe("Apprentice");
    });

    expect(result.current.nextAvatar?.name).toBe("Master");
  });

  it("should set nextAvatar to null if user has reached max level", async () => {
    (useMetrics as jest.Mock).mockReturnValue({
      focusCycles: 15,
      isLoading: false,
    });

    const { result } = renderHook(() => useAvatarProgression());

    await waitFor(() => {
      expect(result.current.currentAvatar?.name).toBe("Master");
    });

    expect(result.current.nextAvatar).toBeNull();
  });

  it("should handle API errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject("API Crash"));

    (useMetrics as jest.Mock).mockReturnValue({
      focusCycles: 0,
      isLoading: false,
    });

    const { result } = renderHook(() => useAvatarProgression());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
