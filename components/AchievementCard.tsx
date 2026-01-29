"use client";

import { useShareImage } from "@/hooks/useShareImage";
import { MetricsSummaryData } from "@/types/metrics";
import { Share2, Trophy, Clock, Target } from "lucide-react";
import { timerService } from "@/services/timerService";
import { SAFE_COLORS } from "@/types/safeColors";

interface AchievementCardProps {
  data: MetricsSummaryData;
}

export const AchievementCard = ({ data }: AchievementCardProps) => {
  const { captureRef, isSharing, shareImage } = useShareImage();

  const timeDisplay = timerService.formatHourMinute(data.totalFocusSeconds);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-[var(--spacing-lg)]">
      <div
        ref={captureRef}
        className="
          relative
          flex flex-col items-center
          w-full
          p-8
          rounded-xl
          shadow-2xl
          overflow-hidden
        "
        style={{
          backgroundColor: SAFE_COLORS.bgSurface,
          border: `1px solid ${SAFE_COLORS.border}`,
        }}
      >
        {" "}
        <div
          className="absolute top-0 left-0 w-full h-2"
          style={{
            background: `linear-gradient(90deg, ${SAFE_COLORS.primary} 0%, ${SAFE_COLORS.blue} 100%)`,
          }}
        />
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{
            backgroundColor: "#064e3b",
            color: SAFE_COLORS.primary,
          }}
        >
          <Trophy size={32} strokeWidth={2} />
        </div>
        <h3
          className="text-xl font-bold text-center mb-1"
          style={{ color: SAFE_COLORS.textPrimary }}
        >
          Goal Achieved!
        </h3>
        <p
          className="text-sm text-center mb-8 px-4"
          style={{ color: SAFE_COLORS.textSecondary }}
        >
          Congratulations on your dedication! You completed an amazing focus
          cycle today.
        </p>
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div
            className="flex flex-col items-center p-3 rounded-lg border"
            style={{
              backgroundColor: SAFE_COLORS.bgMain,
              borderColor: SAFE_COLORS.border,
            }}
          >
            <Clock size={20} color={SAFE_COLORS.primary} className="mb-2" />
            <span
              className="text-xl font-bold"
              style={{ color: SAFE_COLORS.textPrimary }}
            >
              {timeDisplay}
            </span>
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ color: SAFE_COLORS.textSecondary }}
            >
              Focus Time
            </span>
          </div>

          <div
            className="flex flex-col items-center p-3 rounded-lg border"
            style={{
              backgroundColor: SAFE_COLORS.bgMain,
              borderColor: SAFE_COLORS.border,
            }}
          >
            <Target size={20} color={SAFE_COLORS.blue} className="mb-2" />
            <span
              className="text-xl font-bold"
              style={{ color: SAFE_COLORS.textPrimary }}
            >
              {data.totalFocusSessions}
            </span>
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ color: SAFE_COLORS.textSecondary }}
            >
              Sessions
            </span>
          </div>
        </div>
        <div
          className="text-[10px] opacity-50 font-mono"
          style={{ color: SAFE_COLORS.textSecondary }}
        >
          Pomodoro App • {new Date().toLocaleDateString()}
        </div>
      </div>

      <button
        onClick={shareImage}
        disabled={isSharing}
        className="
          flex items-center gap-2
          mt-[var(--spacing-md)]
          py-[var(--spacing-md)] px-[var(--spacing-xl)]
          bg-[var(--primary-color)]
          text-[var(--text-on-primary)]
          font-bold
          rounded-[var(--radius-full)]
          shadow-lg hover:shadow-[0_0_15px_var(--primary-color)]
          hover:opacity-90
          transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isSharing ? (
          <>Generating image...</>
        ) : (
          <>
            <Share2 size={20} />
            Share Achievement
          </>
        )}
      </button>
    </div>
  );
};
