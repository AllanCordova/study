"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Save, Check, SkipForward } from "lucide-react";

interface Character {
  name: string;
  filename: string;
}

interface ImageSelectorProps {
  characters: Character[];
  imagesPerCharacter: number;
  onSave: (selections: Array<{ characterName: string; imageUrl: string; filename: string }>) => void;
  onSkip?: () => void;
  hasMore: boolean;
}

export const ImageSelector = ({
  characters,
  imagesPerCharacter,
  onSave,
  onSkip,
  hasMore,
}: ImageSelectorProps) => {
  const [imageData, setImageData] = useState<
    Record<string, { urls: string[]; selected: number | null; loading: boolean }>
  >({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    characters.forEach((char) => {
      if (!imageData[char.name]) {
        loadImages(char.name);
      }
    });
  }, [characters]);

  const loadImages = async (characterName: string, resetSelection = true) => {
    setImageData((prev) => ({
      ...prev,
      [characterName]: {
        urls: [],
        selected: resetSelection ? null : prev[characterName]?.selected ?? null,
        loading: true,
      },
    }));

    try {
      const response = await fetch("/api/images/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: characterName,
          maxResults: imagesPerCharacter,
          preferredSites: ["pinterest.com", "deviantart.com", "artstation.com"],
        }),
      });

      const data = await response.json();

      if (response.ok && data.imageUrls) {
        setImageData((prev) => ({
          ...prev,
          [characterName]: {
            urls: data.imageUrls,
            selected: prev[characterName]?.selected ?? null,
            loading: false,
          },
        }));
      } else {
        setImageData((prev) => ({
          ...prev,
          [characterName]: { urls: [], selected: null, loading: false },
        }));
      }
    } catch (error) {
      console.error(`Error loading images for ${characterName}:`, error);
      setImageData((prev) => ({
        ...prev,
        [characterName]: { urls: [], selected: null, loading: false },
      }));
    }
  };

  const handleSelect = (characterName: string, index: number) => {
    setImageData((prev) => ({
      ...prev,
      [characterName]: {
        ...prev[characterName],
        selected: prev[characterName].selected === index ? null : index,
      },
    }));
  };

  const handleSave = () => {
    const selections = characters
      .map((char) => {
        const data = imageData[char.name];
        if (data?.selected !== null && data?.selected !== undefined && data.urls[data.selected]) {
          return {
            characterName: char.name,
            imageUrl: data.urls[data.selected],
            filename: char.filename,
          };
        }
        return null;
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);

    if (selections.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setSaving(true);
    onSave(selections);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {characters.map((character) => {
        const data = imageData[character.name] || {
          urls: [],
          selected: null,
          loading: false,
        };

        return (
          <div
            key={character.name}
            className="
              flex flex-col
              p-[var(--spacing-lg)]
              bg-[var(--bg-surface)]
              border-[var(--border-thin)] border-[var(--border-color-soft)]
              rounded-[var(--radius-lg)]
            "
          >
            <div className="flex items-center justify-between mb-[var(--spacing-md)]">
              <h2 className="text-[var(--font-size-lg)] font-bold text-[var(--text-primary)]">
                {character.name}
              </h2>
              <button
                onClick={() => loadImages(character.name, true)}
                disabled={data.loading}
                className="
                  flex items-center gap-[var(--spacing-xs)]
                  px-[var(--spacing-md)] py-[var(--spacing-sm)]
                  bg-[var(--bg-input)]
                  text-[var(--text-secondary)]
                  hover:text-[var(--primary-color)]
                  rounded-[var(--radius-sm)]
                  transition-colors
                  disabled:opacity-50
                "
                data-testid={`reload-${character.name}`}
              >
                <RefreshCw
                  size={18}
                  className={data.loading ? "animate-spin" : ""}
                />
                <span>Reload</span>
              </button>
            </div>

            {data.loading ? (
              <div className="flex items-center justify-center py-[var(--spacing-xl)]">
                <div className="text-[var(--text-secondary)]">Loading images...</div>
              </div>
            ) : data.urls.length === 0 ? (
              <div className="flex items-center justify-center py-[var(--spacing-xl)]">
                <div className="text-[var(--text-secondary)]">No images found</div>
              </div>
            ) : (
              <div
                className="
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10
                  gap-[var(--spacing-sm)]
                "
              >
                {data.urls.map((url, index) => {
                  const isSelected = data.selected === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(character.name, index)}
                      className={`
                        relative
                        aspect-square
                        rounded-[var(--radius-md)]
                        overflow-hidden
                        border-[3px]
                        transition-all
                        hover:scale-105
                        ${
                          isSelected
                            ? "border-[var(--primary-color)] shadow-[0_0_20px_-5px_var(--primary-color)]"
                            : "border-[var(--border-color-soft)] hover:border-[var(--primary-color)]/50"
                        }
                      `}
                      data-testid={`image-${character.name}-${index}`}
                    >
                      <img
                        src={url}
                        alt={`${character.name} option ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      {isSelected && (
                        <div
                          className="
                            absolute inset-0
                            bg-[var(--primary-color)]/20
                            flex items-center justify-center
                          "
                        >
                          <div
                            className="
                              w-8 h-8
                              bg-[var(--primary-color)]
                              rounded-[var(--radius-full)]
                              flex items-center justify-center
                            "
                          >
                            <Check size={20} className="text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-center gap-[var(--spacing-md)]">
        {hasMore && onSkip && (
          <button
            onClick={onSkip}
            disabled={saving}
            className="
              flex items-center gap-[var(--spacing-sm)]
              px-[var(--spacing-xl)] py-[var(--spacing-md)]
              bg-[var(--bg-surface)]
              border-[var(--border-thin)] border-[var(--border-color-soft)]
              text-[var(--text-primary)]
              font-semibold
              rounded-[var(--radius-md)]
              hover:bg-[var(--bg-input)]
              transition-colors
              disabled:opacity-50
            "
            data-testid="skip-button"
          >
            <SkipForward size={20} />
            <span>Skip & Next Batch</span>
          </button>
        )}
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="
            flex items-center gap-[var(--spacing-sm)]
            px-[var(--spacing-xl)] py-[var(--spacing-md)]
            bg-[var(--primary-color)]
            text-[var(--text-on-primary)]
            font-semibold
            rounded-[var(--radius-md)]
            hover:opacity-90
            transition-opacity
            disabled:opacity-50
          "
          data-testid="save-button"
        >
          <Save size={20} />
          <span>{saving ? "Saving..." : hasMore ? "Save & Next Batch" : "Save"}</span>
        </button>
      </div>
    </div>
  );
};
