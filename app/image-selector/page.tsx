"use client";

import { useState, useMemo } from "react";
import { ImageSelector } from "@/components/image-selector/ImageSelector";
import { Loading } from "@/components/ui/Loading";
import { useAvatarProgression } from "@/hooks/useAvatarProgression";

const BATCH_SIZE = 5;
const IMAGES_PER_CHARACTER = 10;

export default function ImageSelectorPage() {
  const { allPersons, isLoading: isLoadingPersons, error } = useAvatarProgression();
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const characters = useMemo(() => {
    return allPersons.map((person) => {
      const filename = person.image_path
        ? person.image_path.split("/").pop() || ""
        : "";
      return {
        name: person.name,
        filename: filename,
      };
    });
  }, [allPersons]);

  const currentCharacters = characters.slice(
    currentBatch * BATCH_SIZE,
    (currentBatch + 1) * BATCH_SIZE
  );
  const totalBatches = Math.ceil(characters.length / BATCH_SIZE);
  const hasMore = currentBatch < totalBatches - 1;

  const handleSave = async (selections: Array<{ characterName: string; imageUrl: string; filename: string }>) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/images/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Saved ${data.results.filter((r: any) => r.success).length} images successfully!`);
        if (hasMore) {
          setCurrentBatch(currentBatch + 1);
        }
      } else {
        alert("Error saving images: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save images");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    if (hasMore) {
      setCurrentBatch(currentBatch + 1);
    }
  };

  if (isLoadingPersons) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-[var(--spacing-lg)]">
        <h2 className="text-[var(--font-size-xl)] font-bold text-red-500 mb-[var(--spacing-sm)]">
          Error loading characters
        </h2>
        <p className="text-[var(--text-secondary)] text-center">
          {error}
        </p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-[var(--spacing-lg)]">
        <h2 className="text-[var(--font-size-xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-sm)]">
          No characters found
        </h2>
        <p className="text-[var(--text-secondary)] text-center">
          Please add characters to the database first.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-[var(--spacing-lg)]">
      <header className="mb-[var(--spacing-xl)] text-center">
        <h1 className="text-[var(--font-size-xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-sm)]">
          Image Selector
        </h1>
        <p className="text-[var(--text-secondary)]">
          Batch {currentBatch + 1} of {totalBatches} - {currentCharacters.length} characters
        </p>
      </header>

      <ImageSelector
        characters={currentCharacters}
        imagesPerCharacter={IMAGES_PER_CHARACTER}
        onSave={handleSave}
        onSkip={handleSkip}
        hasMore={hasMore}
      />
    </div>
  );
}
