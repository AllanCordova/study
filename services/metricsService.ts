import {
  MetricsSummaryData,
  PomodoroSession,
  SessionType,
} from "@/types/metrics";

const STORAGE_KEY = "pomodoro_metrics";

export const metricsService = {
  saveSession(durationInSeconds: number, type: SessionType): void {
    if (typeof window === "undefined") return;

    try {
      const currentHistoryRaw = localStorage.getItem(STORAGE_KEY);
      const currentHistory: PomodoroSession[] = currentHistoryRaw
        ? JSON.parse(currentHistoryRaw)
        : [];

      const newSession: PomodoroSession = {
        id: crypto.randomUUID(),
        type,
        duration: durationInSeconds,
        completedAt: new Date().toISOString(),
      };

      const updatedHistory = [newSession, ...currentHistory];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

      console.log("Sessão salva com sucesso:", newSession);
    } catch (error) {
      console.error("Erro ao salvar métricas:", error);
    }
  },

  getHistory(): PomodoroSession[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getSummary(): MetricsSummaryData {
    const history = this.getHistory();

    return history.reduce(
      (acc, session) => {
        if (session.type === "focus") {
          acc.totalFocusSeconds += session.duration;
          acc.totalFocusSessions += 1;
        } else {
          acc.totalBreakSeconds += session.duration;
          acc.totalBreakSessions += 1;
        }
        return acc;
      },
      {
        totalFocusSeconds: 0,
        totalFocusSessions: 0,
        totalBreakSeconds: 0,
        totalBreakSessions: 0,
      },
    );
  },

  getFocusCycles(): number {
    const data = this.getHistory();
    const cycles = data.filter((s) => s.type === "focus");
    return cycles.length;
  },
};
