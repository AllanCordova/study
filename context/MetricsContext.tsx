"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { PomodoroSession, SessionType } from "@/types/metrics";
import { metricsService } from "@/services/metricsService";

interface MetricsContextType {
  sessions: PomodoroSession[];
  focusCycles: number;
  breakCycles: number;
  registerSession: (duration: number, type: SessionType) => void;
  isLoading: boolean;
}

const MetricsContext = createContext<MetricsContextType>(
  {} as MetricsContextType,
);

export const MetricsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const history = metricsService.getHistory();
    setSessions(history);
    setIsLoading(false);
  }, []);

  const registerSession = (duration: number, type: SessionType) => {
    metricsService.saveSession(duration, type);

    const updatedHistory = metricsService.getHistory();
    setSessions(updatedHistory);
  };

  const focusCycles = useMemo(() => {
    return sessions.filter((s) => s.type === "focus").length;
  }, [sessions]);

  const breakCycles = useMemo(() => {
    return sessions.filter((s) => s.type === "break").length;
  }, [sessions]);

  return (
    <MetricsContext.Provider
      value={{
        sessions,
        focusCycles,
        breakCycles,
        registerSession,
        isLoading,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => useContext(MetricsContext);
