import { SessionType } from "@/types/metrics";
import { Book, Coffee } from "lucide-react";

interface ModeToggleProps {
  currentMode: SessionType;
  onModeChange: (mode: SessionType) => void;
}

export const ModeToggle = ({ currentMode, onModeChange }: ModeToggleProps) => {
  return (
    <div
      className="
        flex items-center justify-center
        p-[var(--spacing-xs)]
        bg-[var(--bg-surface)]
        border-[var(--border-thin)] border-[var(--border-color-soft)]
        rounded-[var(--radius-full)]
        w-fit
        mb-[var(--spacing-lg)]
      "
    >
      <button
        onClick={() => onModeChange("focus")}
        className={`
          flex items-center gap-[var(--spacing-xs)]
          py-[var(--spacing-sm)] px-[var(--spacing-lg)]
          text-[var(--font-size-sm)] font-bold
          rounded-[var(--radius-full)]
          transition-all duration-300
          ${
            currentMode === "focus"
              ? "bg-[var(--primary-color)] text-[var(--text-on-primary)] shadow-md"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }
        `}
      >
        <Book size={16} />
        Focus
      </button>

      <button
        onClick={() => onModeChange("break")}
        className={`
          flex items-center gap-[var(--spacing-xs)]
          py-[var(--spacing-sm)] px-[var(--spacing-lg)]
          text-[var(--font-size-sm)] font-bold
          rounded-[var(--radius-full)]
          transition-all duration-300
          ${
            currentMode === "break"
              ? "bg-[var(--primary-color)] text-[var(--text-on-primary)] shadow-md"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }
        `}
      >
        <Coffee size={16} />
        Break
      </button>
    </div>
  );
};
