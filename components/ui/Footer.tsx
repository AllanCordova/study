import { Shield, FileText } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        flex flex-col items-center justify-center
        w-full
        py-[var(--spacing-lg)] px-[var(--spacing-md)]
        bg-[var(--bg-surface)]
        border-t border-[var(--border-color-soft)]
        mt-auto
      "
    >
      <p
        className="
          text-[var(--font-size-sm)]
          text-[var(--text-secondary)]
          font-medium
        "
      >
        &copy; {currentYear} Pomodoro App. All rights reserved.
      </p>

      <div className="flex gap-[var(--spacing-md)] mt-[var(--spacing-sm)]">
        <a
          href="#"
          className="
            flex items-center gap-[var(--spacing-xs)]
            text-[var(--font-size-sm)]
            text-[var(--text-secondary)]
            hover:text-[var(--text-primary)]
            transition-colors
          "
        >
          <Shield size={14} />
          Privacy
        </a>
        <a
          href="#"
          className="
            flex items-center gap-[var(--spacing-xs)]
            text-[var(--font-size-sm)]
            text-[var(--text-secondary)]
            hover:text-[var(--text-primary)]
            transition-colors
          "
        >
          <FileText size={14} />
          Terms
        </a>
      </div>
    </footer>
  );
};
