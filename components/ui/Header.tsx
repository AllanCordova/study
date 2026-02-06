"use client";

import { useState } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { Settings, Timer, BarChart2, Trophy, Image as ImageIcon, Menu } from "lucide-react";

export const Header = () => {
  const { openSettings } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        flex flex-col
        w-full
        py-[var(--spacing-md)] px-[var(--spacing-lg)]
        bg-[var(--bg-main)]/80
        backdrop-blur-md
        border-b border-[var(--border-color-soft)]
      "
    >
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          className="flex items-center gap-[var(--spacing-sm)] group"
          data-testid="home-link"
        >
          <div className="text-[var(--primary-color)] transition-transform group-hover:scale-110">
            <Timer size={24} strokeWidth={2.5} />
          </div>

          <h1 className="text-[var(--font-size-lg)] font-bold text-[var(--text-primary)] tracking-tight">
            Pomodoro
          </h1>
        </Link>

        <div className="flex items-center gap-[var(--spacing-sm)]">
          <nav className="hidden md:flex items-center gap-[var(--spacing-md)]">
            <Link
              href="/achievements"
              className="
                flex items-center gap-[var(--spacing-xs)]
                text-[var(--font-size-sm)]
                text-[var(--text-secondary)]
                hover:text-[var(--primary-color)]
                transition-colors
              "
              data-testid="achievements-link"
            >
              <Trophy size={20} />
              <span>Achievements</span>
            </Link>

            <div className="h-4 w-[1px] bg-[var(--border-color-soft)]" />

            <Link
              href="/image-selector"
              className="
                flex items-center gap-[var(--spacing-xs)]
                text-[var(--font-size-sm)]
                text-[var(--text-secondary)]
                hover:text-[var(--primary-color)]
                transition-colors
              "
              data-testid="image-selector-link"
            >
              <ImageIcon size={20} />
              <span>Image Selector</span>
            </Link>

            <div className="h-4 w-[1px] bg-[var(--border-color-soft)]" />

            <Link
              href="/metrics"
              className="
                flex items-center gap-[var(--spacing-xs)]
                text-[var(--font-size-sm)]
                text-[var(--text-secondary)]
                hover:text-[var(--primary-color)]
                transition-colors
              "
              data-testid="metrics-link"
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

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="
              md:hidden
              p-[var(--spacing-xs)]
              text-[var(--text-secondary)]
              hover:text-[var(--primary-color)]
              hover:bg-[var(--bg-surface)]
              rounded-[var(--radius-full)]
              transition-all
            "
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className="
            md:hidden
            flex flex-col gap-[var(--spacing-sm)]
            mt-[var(--spacing-md)]
            w-full
            p-[var(--spacing-md)]
            bg-[var(--bg-surface)]
            border-[var(--border-thin)] border-[var(--border-color-soft)]
            rounded-[var(--radius-md)]
          "
        >
          <Link
            href="/achievements"
            className="
              flex items-center gap-[var(--spacing-xs)]
              text-[var(--font-size-sm)]
              text-[var(--text-secondary)]
              hover:text-[var(--primary-color)]
              transition-colors
            "
            data-testid="achievements-link-mobile"
            onClick={() => setIsMenuOpen(false)}
          >
            <Trophy size={18} />
            <span>Achievements</span>
          </Link>

          <Link
            href="/image-selector"
            className="
              flex items-center gap-[var(--spacing-xs)]
              text-[var(--font-size-sm)]
              text-[var(--text-secondary)]
              hover:text-[var(--primary-color)]
              transition-colors
            "
            data-testid="image-selector-link-mobile"
            onClick={() => setIsMenuOpen(false)}
          >
            <ImageIcon size={18} />
            <span>Image Selector</span>
          </Link>

          <Link
            href="/metrics"
            className="
              flex items-center gap-[var(--spacing-xs)]
              text-[var(--font-size-sm)]
              text-[var(--text-secondary)]
              hover:text-[var(--primary-color)]
              transition-colors
            "
            data-testid="metrics-link-mobile"
            onClick={() => setIsMenuOpen(false)}
          >
            <BarChart2 size={18} />
            <span>Metrics</span>
          </Link>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              openSettings();
            }}
            className="
              flex items-center gap-[var(--spacing-xs)]
              text-[var(--font-size-sm)]
              text-[var(--text-secondary)]
              hover:text-[var(--primary-color)]
              transition-colors
            "
            aria-label="Open Settings"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      )}
    </header>
  );
};
