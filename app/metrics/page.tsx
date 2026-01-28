"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AchievementCard } from "@/components/AchievementCard";
import { metricsService } from "@/services/metricsService";
import { MetricsSummaryData } from "@/types/metrics";

export default function MetricsPage() {
  const [summaryData] = useState<MetricsSummaryData | null>(
    metricsService.getSummary(),
  );

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">
      <div className="w-full max-w-sm mx-auto pt-[var(--spacing-md)] px-[var(--spacing-md)]">
        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            text-[var(--text-secondary)]
            hover:text-[var(--primary-color)]
            transition-colors
            cursor-pointer
          "
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Timer</span>
        </Link>
      </div>

      <main className="flex-1 w-full flex flex-col items-center py-[var(--spacing-section)] px-[var(--spacing-md)]">
        {summaryData && summaryData.totalFocusSessions > 0 && (
          <>
            <AchievementCard data={summaryData} />

            <div className="w-full h-[1px] bg-[var(--border-color-soft)] my-[var(--spacing-lg)]" />
          </>
        )}
      </main>
    </div>
  );
}
