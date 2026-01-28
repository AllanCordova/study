"use client";

import { useState } from "react";
import { Timer } from "@/components/timmer/Timer";
import { ModeToggle } from "@/components/timmer/ModeToggle";
import { useSettings } from "@/context/SettingsContext";

export default function Home() {
  const [mode, setMode] = useState<"focus" | "break">("focus");

  const { focusMinutes, breakMinutes } = useSettings();

  const currentDuration =
    mode === "focus" ? focusMinutes * 60 : breakMinutes * 60;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">
      <main
        className="
          flex-1 
          flex flex-col items-center justify-center
          py-[var(--spacing-section)]
          px-[var(--spacing-md)]
        "
      >
        <ModeToggle currentMode={mode} onModeChange={setMode} />

        <Timer
          key={`${mode}-${currentDuration}`}
          seconds={currentDuration}
          mode={mode}
        />

        <p className="mt-[var(--spacing-md)] text-[var(--text-secondary)] text-[var(--font-size-sm)]">
          {mode === "focus"
            ? "Time to work hard!"
            : "Time to relax and recharge."}
        </p>
      </main>
    </div>
  );
}
