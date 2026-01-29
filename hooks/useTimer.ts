import { useState, useEffect, useRef } from "react";
import { SessionType } from "@/types/metrics";
import { useMetrics } from "@/context/MetricsContext";

export const useTimer = (initialTimeInSeconds: number, mode: SessionType) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  const [isActive, setIsActive] = useState(false);

  const originalDuration = useRef(initialTimeInSeconds);
  const { registerSession } = useMetrics();

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(initialTimeInSeconds);
      originalDuration.current = initialTimeInSeconds;
    }
  }, [initialTimeInSeconds, isActive]);

  const progressPercentage =
    ((originalDuration.current - timeLeft) / originalDuration.current) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);

      registerSession(timeLeft, mode);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTimeInSeconds);
  };

  return {
    timeLeft,
    isActive,
    progressPercentage,
    toggleTimer,
    resetTimer,
  };
};
