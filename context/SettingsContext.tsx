"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  focusMinutes: number;
  breakMinutes: number;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  updateFocusTime: (minutes: number) => void;
  updateBreakTime: (minutes: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const updateFocusTime = (minutes: number) => setFocusMinutes(minutes);
  const updateBreakTime = (minutes: number) => setBreakMinutes(minutes);

  return (
    <SettingsContext.Provider
      value={{
        focusMinutes,
        breakMinutes,
        isSettingsOpen,
        openSettings,
        closeSettings,
        updateFocusTime,
        updateBreakTime,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
