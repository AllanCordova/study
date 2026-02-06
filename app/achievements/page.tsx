"use client";

import { useAvatarProgression } from "@/hooks/useAvatarProgression";
import { AchievementCard } from "@/components/achievements/AchievementCard";
import { Loading } from "@/components/ui/Loading";
import { Trophy, AlertCircle } from "lucide-react";

export default function AchievementsPage() {
  const { allPersons, isLoading, error } = useAvatarProgression();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          flex flex-col items-center justify-center
          min-h-screen
          p-[var(--spacing-lg)]
        "
      >
        <AlertCircle
          size={48}
          className="text-red-500 mb-[var(--spacing-md)]"
        />
        <h2
          className="
            text-[var(--font-size-xl)]
            font-bold
            text-red-500
            mb-[var(--spacing-sm)]
          "
        >
          Error loading achievements
        </h2>
        <p className="text-[var(--text-secondary)] text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        flex flex-col
        w-full max-w-7xl mx-auto
        p-[var(--spacing-lg)]
        min-h-screen
      "
    >
      <header
        className="
          flex flex-col items-center
          mb-[var(--spacing-xl)]
          text-center
        "
      >
        <div
          className="
            flex items-center gap-[var(--spacing-sm)]
            mb-[var(--spacing-md)]
          "
        >
          <Trophy
            size={48}
            className="text-[var(--primary-color)]"
          />
          <h1
            className="
              text-[var(--font-size-xl)]
              font-bold
              text-[var(--text-primary)]
            "
            data-testid="achievements-title"
          >
            Achievements Gallery
          </h1>
        </div>

        <p
          className="
            text-[var(--font-size-base)]
            text-[var(--text-secondary)]
            mb-[var(--spacing-sm)]
          "
        >
          Discover all available characters
        </p>

        <div
          className="
            flex items-center gap-[var(--spacing-xs)]
            px-[var(--spacing-md)] py-[var(--spacing-sm)]
            bg-[var(--bg-surface)]
            border-[var(--border-thin)] border-[var(--border-color-soft)]
            rounded-[var(--radius-md)]
          "
        >
          <Trophy size={20} className="text-[var(--primary-color)]" />
          <span
            className="
              text-[var(--font-size-sm)]
              font-semibold
              text-[var(--text-primary)]
            "
            data-testid="total-count"
          >
            {allPersons.length} Characters Available
          </span>
        </div>
      </header>

      <main>
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            gap-[var(--spacing-md)]
          "
          data-testid="achievements-grid"
        >
          {allPersons.map((person) => (
            <AchievementCard key={person.id} person={person} />
          ))}
        </div>
      </main>
    </div>
  );
}
