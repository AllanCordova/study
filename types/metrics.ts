export type SessionType = "focus" | "break";

export interface PomodoroSession {
  id: string;
  type: SessionType;
  duration: number;
  completedAt: string;
}

export interface MetricsSummaryData {
  totalFocusSeconds: number;
  totalFocusSessions: number;
  totalBreakSeconds: number;
  totalBreakSessions: number;
}
