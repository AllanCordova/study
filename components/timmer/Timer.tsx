"use client";

import { useTimer } from "@/hooks/useTimer";
import { timerService } from "@/services/timerService";
import { SessionType } from "@/types/metrics";

type PropType = {
  seconds: number;
  mode: SessionType;
};

export const Timer = ({ seconds, mode }: PropType) => {
  const { isActive, toggleTimer, resetTimer, timeLeft } = useTimer(
    seconds,
    mode,
  );

  return (
    <div
      className="
        flex flex-col items-center justify-center 
        w-full
        p-[var(--spacing-md)]
      "
    >
      <div
        className="
          flex items-center justify-center
          rounded-[var(--radius-full)]
          p-[var(--spacing-xs)]
          mb-[var(--spacing-lg)]
          shadow-xl
        "
        style={{
          background: `conic-gradient(var(--primary-color) ${timerService.getPorcentage(timeLeft, seconds)}%, var(--border-color-soft) 0)`,
        }}
      >
        <div
          className="
            flex items-center justify-center
            w-[clamp(16rem,40vw,24rem)] h-[clamp(16rem,40vw,24rem)]
            bg-[var(--bg-surface)]
            rounded-[var(--radius-full)]
          "
        >
          <span
            className="
              text-[var(--font-size-timer)]
              font-bold
              text-[var(--text-primary)]
              tracking-tighter
              leading-none
            "
          >
            {timerService.formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex gap-[var(--spacing-md)] w-full max-w-md">
        <button
          onClick={toggleTimer}
          className="
            flex-1
            py-[var(--spacing-md)] px-[var(--spacing-lg)]
            bg-[var(--primary-color)]
            text-[var(--text-on-primary)]
            text-[var(--font-size-lg)]
            font-bold
            hover:bg-[var(--primary-color-hover)]
            rounded-[var(--radius-md)]
            cursor-pointer
          "
        >
          {isActive ? "PAUSE" : "START"}
        </button>

        <button
          onClick={resetTimer}
          className="
            py-[var(--spacing-md)] px-[var(--spacing-lg)]
            bg-[var(--bg-input)]
            text-[var(--text-secondary)]
            text-[var(--font-size-lg)]
            font-medium
            border-[var(--border-thin)] border-[var(--border-color-soft)]
            hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]
            rounded-[var(--radius-md)]
            cursor-pointer
          "
        >
          RESET
        </button>
      </div>
    </div>
  );
};
