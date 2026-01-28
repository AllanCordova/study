"use client";

import { useSettings } from "@/context/SettingsContext";
import { PresetButton } from "./timmer/PresetButton";

export const SettingsModal = () => {
  const {
    isSettingsOpen,
    closeSettings,
    focusMinutes,
    breakMinutes,
    updateFocusTime,
    updateBreakTime,
  } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[var(--spacing-md)]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeSettings}
      />

      <div
        className="
          relative
          w-full max-w-md
          bg-[var(--bg-surface)]
          border-[var(--border-thin)] border-[var(--border-color-soft)]
          rounded-[var(--radius-lg)]
          p-[var(--spacing-lg)]
          shadow-2xl
          flex flex-col gap-[var(--spacing-lg)]
          max-h-[90vh] overflow-y-auto
        "
      >
        <header className="flex justify-between items-center">
          <h2 className="text-[var(--font-size-lg)] font-bold text-[var(--text-primary)]">
            Settings
          </h2>
          <button
            onClick={closeSettings}
            className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
          >
            ✕
          </button>
        </header>

        <section className="flex flex-col gap-[var(--spacing-sm)]">
          <label className="text-[var(--font-size-base)] font-medium text-[var(--text-primary)]">
            Focus Duration:{" "}
            <span className="text-[var(--primary-color)]">
              {focusMinutes} min
            </span>
          </label>

          <div className="flex gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
            <PresetButton
              value={25}
              currentValue={focusMinutes}
              onClick={updateFocusTime}
            />
            <PresetButton
              value={45}
              currentValue={focusMinutes}
              onClick={updateFocusTime}
            />
            <PresetButton
              value={60}
              currentValue={focusMinutes}
              onClick={updateFocusTime}
            />
          </div>

          <input
            type="range"
            min="1"
            max="90"
            value={focusMinutes}
            onChange={(e) => updateFocusTime(Number(e.target.value))}
            className="
              w-full h-2 rounded-lg appearance-none cursor-pointer
              bg-[var(--bg-input)] accent-[var(--primary-color)]
            "
          />
        </section>

        <section className="flex flex-col gap-[var(--spacing-sm)]">
          <label className="text-[var(--font-size-base)] font-medium text-[var(--text-primary)]">
            Break Duration:{" "}
            <span className="text-[var(--primary-color)]">
              {breakMinutes} min
            </span>
          </label>

          <div className="flex gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
            <PresetButton
              value={5}
              currentValue={breakMinutes}
              onClick={updateBreakTime}
            />
            <PresetButton
              value={15}
              currentValue={breakMinutes}
              onClick={updateBreakTime}
            />
            <PresetButton
              value={30}
              currentValue={breakMinutes}
              onClick={updateBreakTime}
            />
          </div>

          <input
            type="range"
            min="1"
            max="45"
            value={breakMinutes}
            onChange={(e) => updateBreakTime(Number(e.target.value))}
            className="
              w-full h-2 rounded-lg appearance-none cursor-pointer
              bg-[var(--bg-input)] accent-[var(--primary-color)]
            "
          />
        </section>

        <div className="h-[1px] bg-[var(--border-color-soft)] w-full" />

        <button
          onClick={closeSettings}
          className="
            w-full py-[var(--spacing-md)]
            bg-[var(--primary-color)]
            text-[var(--text-on-primary)]
            font-bold
            rounded-[var(--radius-md)]
            hover:opacity-90
            transition-opacity
          "
        >
          Done
        </button>
      </div>
    </div>
  );
};
