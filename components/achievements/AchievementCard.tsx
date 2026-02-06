import Image from "next/image";
import { Trophy } from "lucide-react";
import { Person } from "@/types/Person";

interface AchievementCardProps {
  person: Person;
}

export const AchievementCard = ({ person }: AchievementCardProps) => {
  return (
    <div
      className="
        relative
        flex flex-col items-center
        p-[var(--spacing-md)]
        bg-[var(--bg-surface)]
        border-[var(--border-thin)] border-[var(--border-color-soft)]
        rounded-[var(--radius-lg)]
        transition-all duration-300
        hover:shadow-lg
        hover:scale-[1.02]
      "
      data-testid={`achievement-card-${person.id}`}
    >
      <div
        className="
          relative
          w-32 h-32
          rounded-[var(--radius-full)]
          overflow-hidden
          border-[3px]
          mb-[var(--spacing-sm)]
          border-[var(--primary-color)]
          shadow-[0_0_20px_-5px_var(--primary-color)]
        "
      >
        {person.image_path ? (
          <Image
            src={person.image_path}
            alt={person.name}
            fill
            sizes="128px"
            className="object-cover transition-opacity opacity-100"
          />
        ) : (
          <div
            className="
              flex items-center justify-center
              w-full h-full
              bg-[var(--bg-input)]
              text-[var(--text-secondary)]
            "
          >
            <Trophy size={48} />
          </div>
        )}
      </div>

      <h3
        className="
          text-[var(--font-size-base)]
          font-bold
          text-center
          mb-[var(--spacing-xs)]
          text-[var(--text-primary)]
        "
        data-testid={`achievement-name-${person.id}`}
      >
        {person.name}
      </h3>

      <div
        className="
          flex items-center gap-[var(--spacing-xs)]
          px-[var(--spacing-sm)] py-[var(--spacing-xs)]
          bg-[var(--bg-input)]
          rounded-[var(--radius-sm)]
        "
      >
        <Trophy
          size={16}
          className="text-[var(--primary-color)]"
        />
        <span
          className="
            text-[var(--font-size-sm)]
            font-semibold
            text-[var(--primary-color)]
          "
          data-testid={`achievement-level-${person.id}`}
        >
          Level {person.level}
        </span>
      </div>
    </div>
  );
};
