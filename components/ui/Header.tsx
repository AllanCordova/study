"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { Settings, Timer, BarChart2 } from "lucide-react";

export const Header = () => {
  const { openSettings } = useSettings();

  return (
    <header
      className="
        sticky top-0 z-50
        flex items-center justify-between
        w-full
        py-[var(--spacing-md)] px-[var(--spacing-lg)]
        bg-[var(--bg-main)]/80
        backdrop-blur-md
        border-b border-[var(--border-color-soft)]
      "
    >
      <Link
        href="/"
        className="flex items-center gap-[var(--spacing-sm)] group"
      >
        <div className="text-[var(--primary-color)] transition-transform group-hover:scale-110">
          <Timer size={24} strokeWidth={2.5} />
        </div>

        <h1 className="text-[var(--font-size-lg)] font-bold text-[var(--text-primary)] tracking-tight">
          Pomodoro
        </h1>
      </Link>

      <nav className="flex items-center gap-[var(--spacing-md)]">
        <Link
          href="/metrics"
          className="
            flex items-center gap-[var(--spacing-xs)]
            text-[var(--font-size-sm)]
            text-[var(--text-secondary)]
            hover:text-[var(--primary-color)]
            transition-colors
          "
        >
          <BarChart2 size={20} />
          <span>Metrics</span>
        </Link>

        <div className="h-4 w-[1px] bg-[var(--border-color-soft)]" />

        <button
          onClick={openSettings}
          className="
            p-[var(--spacing-xs)]
            text-[var(--text-secondary)]
            hover:text-[var(--primary-color)]
            hover:bg-[var(--bg-surface)]
            rounded-[var(--radius-full)]
            transition-all
            cursor-pointer
          "
          aria-label="Open Settings"
        >
          <Settings size={20} />
        </button>
      </nav>
    </header>
  );
};
