import { metricsService } from "@/services/metricsService";
import { SessionType } from "@/types/metrics";

describe("metricsService", () => {
  const STORAGE_KEY = "pomodoro_metrics";

  beforeAll(() => {
    Object.defineProperty(global, "crypto", {
      value: {
        randomUUID: jest.fn().mockReturnValue("test-uuid-123"),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("saveSession", () => {
    it("should save a new session correctly to empty storage", () => {
      const duration = 1500;
      const type: SessionType = "focus";

      metricsService.saveSession(duration, type);

      const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      expect(storedData).toHaveLength(1);
      expect(storedData[0]).toMatchObject({
        id: "test-uuid-123",
        duration,
        type,
      });
      expect(storedData[0].completedAt).toBeDefined();
    });

    it("should append a new session to existing history", () => {
      const existingSession = {
        id: "old-uuid",
        type: "focus",
        duration: 300,
        completedAt: "2023-01-01T00:00:00.000Z",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([existingSession]));

      metricsService.saveSession(600, "break");

      const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      expect(storedData).toHaveLength(2);
      expect(storedData[0].type).toBe("break");
      expect(storedData[1].type).toBe("focus");
    });
  });

  describe("getHistory", () => {
    it("should return an empty array if storage is empty", () => {
      const history = metricsService.getHistory();
      expect(history).toEqual([]);
    });

    it("should return parsed data from storage", () => {
      const mockData = [
        { id: "1", type: "focus", duration: 100, completedAt: "date" },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));

      const history = metricsService.getHistory();
      expect(history).toEqual(mockData);
    });
  });

  describe("getSummary", () => {
    it("should calculate totals correctly for mixed sessions", () => {
      const mockHistory = [
        { id: "1", type: "focus", duration: 1000, completedAt: "date" },
        { id: "2", type: "focus", duration: 2000, completedAt: "date" },
        { id: "3", type: "short-break", duration: 300, completedAt: "date" },
        { id: "4", type: "long-break", duration: 900, completedAt: "date" },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));

      const summary = metricsService.getSummary();

      expect(summary).toEqual({
        totalFocusSeconds: 3000,
        totalFocusSessions: 2,
        totalBreakSeconds: 1200,
        totalBreakSessions: 2,
      });
    });

    it("should return zeros if history is empty", () => {
      const summary = metricsService.getSummary();

      expect(summary).toEqual({
        totalFocusSeconds: 0,
        totalFocusSessions: 0,
        totalBreakSeconds: 0,
        totalBreakSessions: 0,
      });
    });
  });
});
