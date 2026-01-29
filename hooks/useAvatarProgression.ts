import { useEffect, useState } from "react";
import { Person } from "@/types/Person";
import { useMetrics } from "@/context/MetricsContext";

export const useAvatarProgression = () => {
  const { focusCycles, isLoading: isHistoryLoading } = useMetrics();

  const [currentAvatar, setCurrentAvatar] = useState<Person | null>(null);
  const [nextAvatar, setNextAvatar] = useState<Person | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(true);

  useEffect(() => {
    if (isHistoryLoading) return;

    async function resolveProgression() {
      try {
        const response = await fetch("http://localhost:3000/api/persons");
        if (!response.ok) throw new Error("Erro na API");
        const data: Person[] = await response.json();

        const sortedPersons = data.sort((a, b) => a.level - b.level);

        const unlocked = sortedPersons.filter((p) => p.level <= focusCycles);

        const current =
          unlocked.length > 0
            ? unlocked[unlocked.length - 1]
            : sortedPersons[0];

        const next = sortedPersons.find((p) => p.level > focusCycles) || null;

        setCurrentAvatar(current);
        setNextAvatar(next);
      } catch (error) {
        console.error("Progression logic error:", error);
      } finally {
        setIsLoadingApi(false);
      }
    }

    resolveProgression();
  }, [focusCycles, isHistoryLoading]);

  return {
    currentAvatar,
    nextAvatar,
    userCycles: focusCycles,
    isLoading: isHistoryLoading || isLoadingApi,
  };
};
