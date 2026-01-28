export const PresetButton = ({
  value,
  currentValue,
  onClick,
}: {
  value: number;
  currentValue: number;
  onClick: (val: number) => void;
}) => (
  <button
    onClick={() => onClick(value)}
    className={`
        px-[var(--spacing-md)] py-[var(--spacing-sm)]
        text-[var(--font-size-sm)] font-medium
        rounded-[var(--radius-sm)]
        border-[var(--border-thin)]
        transition-all
        ${
          value === currentValue
            ? "bg-[var(--primary-color)] text-[var(--text-on-primary)] border-[var(--primary-color)]"
            : "bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color-soft)] hover:border-[var(--text-primary)]"
        }
      `}
  >
    {value} min
  </button>
);
