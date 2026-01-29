import Image from "next/image";
import { User, Trophy, Lock } from "lucide-react";
import { useAvatarProgression } from "@/hooks/useAvatarProgression";
import { Loading } from "../ui/Loading";

export const Avatar = () => {
  const { currentAvatar, nextAvatar, userCycles, isLoading } =
    useAvatarProgression();

  if (isLoading || !currentAvatar) return <Loading />;

  const progressPercentage = nextAvatar
    ? Math.min(100, (userCycles / nextAvatar.level) * 100)
    : 100;

  return (
    <div className="flex flex-col items-center gap-[var(--spacing-md)] w-full max-w-sm">
      <div
        className="
          relative flex flex-col items-center justify-center
          p-[var(--spacing-lg)]
          bg-[var(--bg-surface)]
          border-[var(--border-thin)] border-[var(--border-color-soft)]
          rounded-[var(--radius-lg)]
          shadow-xl
          w-full
          transition-all duration-500
        "
      >
        <div
          className="
            relative 
            w-48 h-48 lg:w-64 lg:h-64 
            rounded-[var(--radius-full)] 
            overflow-hidden 
            border-[4px] border-[var(--primary-color)]
            bg-[var(--bg-input)]
            mb-[var(--spacing-md)]
            shadow-[0_0_30px_-5px_var(--primary-color)]
          "
        >
          {currentAvatar.image_path ? (
            <Image
              src={currentAvatar.image_path}
              alt={currentAvatar.name}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover transition-transform hover:scale-110 duration-700"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-[var(--text-secondary)]">
              <User size={64} />
            </div>
          )}
        </div>

        <h2 className="text-[var(--font-size-xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-xs)]">
          {currentAvatar.name}
        </h2>

        <div className="flex items-center gap-2 px-4 py-1 bg-[var(--bg-input)] rounded-full border border-[var(--border-color-soft)]">
          <Trophy size={18} className="text-[var(--primary-color)]" />
          <span className="text-[var(--font-size-base)] font-bold text-[var(--text-secondary)]">
            Level {currentAvatar.level}
          </span>
        </div>
      </div>

      {nextAvatar ? (
        <div className="w-full flex flex-col gap-2 p-4 bg-[var(--bg-surface)] rounded-[var(--radius-md)] border border-[var(--border-color-soft)]/50">
          <div className="flex justify-between text-[var(--font-size-sm)] text-[var(--text-secondary)]">
            <span>
              Current Cycles:{" "}
              <strong className="text-[var(--primary-color)]">
                {userCycles}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              Next: {nextAvatar.name} <Lock size={12} />
            </span>
          </div>

          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary-color)] transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-center text-[var(--font-size-sm)] text-[var(--text-secondary)] opacity-70">
            {nextAvatar.level - userCycles} more cycles to evolve
          </p>
        </div>
      ) : (
        <div className="text-[var(--primary-color)] font-bold mt-2 animate-pulse">
          MAXIMUM LEVEL REACHED!
        </div>
      )}
    </div>
  );
};
