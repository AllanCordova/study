"use client";

import { useState } from "react";
import { Timer } from "@/components/timmer/Timer";
import { ModeToggle } from "@/components/timmer/ModeToggle";
import { useSettings } from "@/context/SettingsContext";
import { Avatar } from "@/components/person/Avatar";

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
        <div
          className="
            flex flex-col lg:flex-row items-center justify-center 
            gap-[var(--spacing-xl)] lg:gap-[var(--spacing-section)]
            w-full max-w-7xl
          "
        >
          <section className="flex flex-col items-center flex-1 lg:order-1">
            <div className="mb-[var(--spacing-lg)]">
              <ModeToggle currentMode={mode} onModeChange={setMode} />
            </div>

            <Timer
              key={`${mode}-${currentDuration}`}
              seconds={currentDuration}
              mode={mode}
            />

            <p className="mt-[var(--spacing-md)] text-[var(--text-secondary)] text-[var(--font-size-base)] font-medium">
              {mode === "focus"
                ? "Time to work hard!"
                : "Time to relax and recharge."}
            </p>
          </section>

          <aside className="flex justify-center flex-1 lg:order-2">
            <Avatar />
          </aside>
        </div>
      </main>
    </div>
  );
}
