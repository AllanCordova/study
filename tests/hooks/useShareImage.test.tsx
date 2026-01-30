import { renderHook, act, waitFor } from "@testing-library/react";
import { useShareImage } from "@/hooks/useShareImage";
import html2canvas from "html2canvas";

jest.mock("html2canvas", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("useShareImage Hook", () => {
  const mockShare = jest.fn();
  const mockCanShare = jest.fn();

  beforeAll(() => {
    Object.defineProperty(global.navigator, "share", {
      value: mockShare,
      writable: true,
    });
    Object.defineProperty(global.navigator, "canShare", {
      value: mockCanShare,
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (html2canvas as unknown as jest.Mock).mockResolvedValue({
      toBlob: (callback: (blob: Blob | null) => void) => {
        callback(new Blob(["mock-image"], { type: "image/png" }));
      },
    });
  });

  it("should initialize with default states", () => {
    const { result } = renderHook(() => useShareImage());
    expect(result.current.isSharing).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set error if navigator.share is undefined", async () => {
    // @ts-ignore
    global.navigator.share = undefined;

    const { result } = renderHook(() => useShareImage());

    const div = document.createElement("div");
    (result.current.captureRef as any).current = div;

    await act(async () => {
      await result.current.shareImage();
    });

    expect(result.current.error).toBe(
      "Seu navegador não suporta compartilhamento nativo.",
    );
    expect(result.current.isSharing).toBe(false);
    expect(html2canvas).not.toHaveBeenCalled();
  });

  it("should set error if device does not support file sharing (canShare returns false)", async () => {
    global.navigator.share = mockShare;
    mockCanShare.mockReturnValue(false);

    const { result } = renderHook(() => useShareImage());
    const div = document.createElement("div");
    (result.current.captureRef as any).current = div;

    await act(async () => {
      await result.current.shareImage();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Seu dispositivo não permite compartilhar imagens.",
      );
    });

    expect(mockShare).not.toHaveBeenCalled();
    expect(result.current.isSharing).toBe(false);
  });

  it("should successfully share when supported", async () => {
    global.navigator.share = mockShare;
    mockCanShare.mockReturnValue(true);
    mockShare.mockResolvedValue(undefined);

    const { result } = renderHook(() => useShareImage());
    const div = document.createElement("div");
    (result.current.captureRef as any).current = div;

    await act(async () => {
      await result.current.shareImage();
    });

    await waitFor(() => {
      expect(mockShare).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "My Achievement",
          files: expect.any(Array),
        }),
      );
    });

    expect(result.current.error).toBeNull();
    expect(result.current.isSharing).toBe(false);
  });
});
