import { timerService } from "@/services/timerService";

describe("timerService", () => {
  describe("formatTime", () => {
    it("should format seconds to MM:SS correctly", () => {
      expect(timerService.formatTime(0)).toBe("00:00");
      expect(timerService.formatTime(9)).toBe("00:09");
      expect(timerService.formatTime(65)).toBe("01:05");
      expect(timerService.formatTime(600)).toBe("10:00");
    });
  });

  describe("formatDuration", () => {
    it("should return minutes and seconds when both exist", () => {
      expect(timerService.formatDuration(90)).toBe("1m 30s");
    });

    it("should return only minutes when seconds are 0", () => {
      expect(timerService.formatDuration(120)).toBe("2 min");
    });

    it("should return only seconds when minutes are 0", () => {
      expect(timerService.formatDuration(45)).toBe("45 sec");
    });
  });

  describe("formatHourMinute", () => {
    it("should format hours and minutes correctly", () => {
      expect(timerService.formatHourMinute(3660)).toBe("1h 1m");
    });

    it("should format only minutes if less than 1 hour", () => {
      expect(timerService.formatHourMinute(1800)).toBe("30m");
    });

    it("should format exact hours correctly", () => {
      expect(timerService.formatHourMinute(3600)).toBe("1h 0m");
    });
  });

  describe("getPorcentage", () => {
    it("should calculate the percentage of elapsed time", () => {
      const totalTime = 100;

      expect(timerService.getPorcentage(50, totalTime)).toBe(50);

      expect(timerService.getPorcentage(25, totalTime)).toBe(75);
    });

    it("should return 0% if remaining time equals total time", () => {
      expect(timerService.getPorcentage(100, 100)).toBe(0);
    });

    it("should return 100% if remaining time is 0", () => {
      expect(timerService.getPorcentage(0, 100)).toBe(100);
    });
  });

  describe("getPomodoroStart", () => {
    it("should return 25 minutes in seconds (1500)", () => {
      expect(timerService.getPomodoroStart()).toBe(1500);
    });
  });

  describe("formatDate", () => {
    it("should format an ISO date to the pt-BR standard", () => {
      const isoDate = "2023-12-25T15:30:00.000Z";
      const result = timerService.formatDate(isoDate);

      expect(result).toMatch(/\d{2}\/\d{2}/);

      expect(result).toContain(":");
    });
  });
});
