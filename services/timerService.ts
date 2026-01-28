export const timerService = {
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  },

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0 && secs > 0) return `${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes} min`;
    return `${secs} sec`;
  },

  formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  formatHourMinute(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  },

  getPorcentage(seconds: number, initialTime: number): number {
    const progressPercentage = ((initialTime - seconds) / initialTime) * 100;

    return progressPercentage;
  },

  getPomodoroStart(): number {
    return 25 * 60;
  },
};
