import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-[var(--spacing-md)] w-full max-w-sm">
      <div
        className="
            flex flex-col items-center justify-center
            p-[var(--spacing-lg)]
            bg-[var(--bg-surface)]
            border-[var(--border-thin)] border-[var(--border-color-soft)]
            rounded-[var(--radius-lg)]
            shadow-xl
            w-full
            h-[350px] /* Altura fixa aproximada para segurar o espaço */
          "
      >
        <Loader2
          className="animate-spin text-[var(--primary-color)]"
          size={64}
        />
        <span className="mt-4 text-[var(--text-secondary)] animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};
