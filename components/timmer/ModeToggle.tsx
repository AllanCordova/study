import { useMetrics } from "@/context/MetricsContext";
import { SessionType } from "@/types/metrics";
import { Book, Coffee } from "lucide-react";
import { Loading } from "../ui/Loading";

interface ModeToggleProps {
  currentMode: SessionType;
  onModeChange: (mode: SessionType) => void;
}

export const ModeToggle = ({ currentMode, onModeChange }: ModeToggleProps) => {
  const { breakCycles, focusCycles, isLoading } = useMetrics();

  if (isLoading) return <Loading />;

  return (
    <div
      className="
        flex items-center justify-center
        p-[var(--spacing-xs)]
        bg-[var(--bg-surface)]
        border-[var(--border-thin)] border-[var(--border-color-soft)]
        rounded-[var(--radius-md)]
        w-fit
        mb-[var(--spacing-lg)]
      "
    >
      <button
        onClick={() => onModeChange("focus")}
        className={`
          flex flex-col items-center justify-center
          min-w-[100px]
          py-[var(--spacing-sm)] px-[var(--spacing-md)]
          rounded-[var(--radius-sm)]
          transition-all duration-300
          ${
            currentMode === "focus"
              ? "bg-[var(--primary-color)] text-[var(--text-on-primary)] shadow-md"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }
        `}
      >
        <span className="text-[10px] uppercase tracking-wider opacity-80 leading-none mb-[var(--spacing-xs)]">
          {focusCycles} Cycles
        </span>
        <div className="flex items-center gap-[var(--spacing-xs)]">
          <Book size={16} />
          <span className="text-[var(--font-size-sm)] font-bold">Focus</span>
        </div>
      </button>

      <button
        onClick={() => onModeChange("break")}
        className={`
          flex flex-col items-center justify-center
          min-w-[100px]
          py-[var(--spacing-sm)] px-[var(--spacing-md)]
          rounded-[var(--radius-sm)]
          transition-all duration-300
          ${
            currentMode === "break"
              ? "bg-[var(--primary-color)] text-[var(--text-on-primary)] shadow-md"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }
        `}
      >
        <span className="text-[10px] uppercase tracking-wider opacity-80 leading-none mb-[var(--spacing-xs)]">
          {breakCycles} Cycles
        </span>
        <div className="flex items-center gap-[var(--spacing-xs)]">
          <Coffee size={16} />
          <span className="text-[var(--font-size-sm)] font-bold">Break</span>
        </div>
      </button>
    </div>
  );
};
