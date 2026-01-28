/**
 * ============================================================================
 * ARCHITECTURE & CLEAN CODE RULES (READ BEFORE CODING)
 * ============================================================================
 * 1. EXPORT STYLE: Always use `export const ComponentName = () => {}`.
 * 2. NAMING:
 * - Files/Components: PascalCase (e.g., TimerDisplay).
 * - Props/Variables: camelCase (e.g., isActive, handleStart).
 * - Language: ALWAYS English.
 * 3. LOGIC SEPARATION (CRITICAL):
 * - UI Components must be "dumb".
 * - NO `useState`, `useEffect` or complex logic inside the JSX return.
 * - Move all logic to custom hooks (e.g., useTimer) or services.
 * 4. STYLING (TAILWIND + CSS VARIABLES + Lucide reacto to icons):
 * - Use Tailwind utility classes for structure (flex, grid, hidden).
 * - For Colors, Spacing, and Borders: STRICTLY use CSS variables defined
 * - For icons use a Lucide-react
 * in global.css (e.g., text-[var(--text-primary)]).
 * - Avoid magic numbers (e.g., p-[13px]).
 * 5. STRUCTURE:
 * - Keep components small. If it gets too big, break it down.
 * 6. Preferences:
 * - Never use comments in lines the codes
 * ============================================================================
 */

// Import the specific hook for this component's logic
// import { useTemplateLogic } from '@/hooks/useTemplateLogic';

interface TemplateComponentProps {
  // Use descriptive names for props
  titleLabel: string;
  isVisible: boolean;
  onActionTrigger: () => void;
}

export const TemplateComponent = ({
  titleLabel,
  isVisible,
  onActionTrigger,
}: TemplateComponentProps) => {
  /**
   * --------------------------------------------------------------------------
   * LOGIC SECTION
   * --------------------------------------------------------------------------
   * Connect to the Hook. The component only receives data and functions.
   * It does not calculate anything.
   */
  // const { formattedData, isLoading } = useTemplateLogic();

  // Early return pattern for cleaner rendering
  if (!isVisible) return null;

  return (
    /**
     * ------------------------------------------------------------------------
     * UI SECTION
     * ------------------------------------------------------------------------
     * - Structure: Tailwind (flex, w-full, etc.)
     * - Theming: Arbitrary values referencing global.css variables
     */
    <div
      className="
      flex flex-col items-center justify-center 
      w-full h-full
      p-[var(--spacing-md)] 
      bg-[var(--bg-surface)] 
      border-[var(--border-thin)] border-[var(--border-color-soft)]
      rounded-[var(--radius-md)]
    "
    >
      <header className="mb-[var(--spacing-sm)]">
        <h2
          className="
          text-[var(--font-size-lg)] 
          font-bold 
          text-[var(--text-primary)]
        "
        >
          {titleLabel}
        </h2>
      </header>

      <main className="w-full">
        {/* Content goes here */}
        <p className="text-[var(--text-secondary)] text-center">
          Component content loaded strictly via props or hooks.
        </p>
      </main>

      <footer className="mt-[var(--spacing-md)] w-full">
        <button
          onClick={onActionTrigger}
          className="
            w-full
            py-[var(--spacing-sm)] px-[var(--spacing-md)]
            bg-[var(--primary-color)] 
            text-[var(--text-on-primary)]
            hover:opacity-90 transition-opacity
            rounded-[var(--radius-sm)]
          "
        >
          Confirm Action
        </button>
      </footer>
    </div>
  );
};
