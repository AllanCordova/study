import { useState, useEffect, useRef } from "react";
import { metricsService } from "@/services/metricsService";
import { SessionType } from "@/types/metrics";

export const useTimer = (initialTimeInSeconds: number, mode: SessionType) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  const [isActive, setIsActive] = useState(false);

  const originalDuration = useRef(initialTimeInSeconds);

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

      metricsService.saveSession(originalDuration.current, mode);
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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    timeLeft,
    isActive,
    progressPercentage,
    formattedTime: formatTime(timeLeft),
    toggleTimer,
    resetTimer,
  };
};
