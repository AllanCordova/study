import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export const useShareImage = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareImage = async () => {
    if (!captureRef.current) return;

    setIsSharing(true);
    setError(null);

    try {
      if (typeof navigator === "undefined" || !navigator.share) {
        throw new Error("Seu navegador não suporta compartilhamento nativo.");
      }

      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#09090b",
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setError("Erro ao gerar a imagem.");
          setIsSharing(false);
          return;
        }

        const file = new File([blob], "pomodoro-achievement.png", {
          type: "image/png",
        });

        if (navigator.canShare && !navigator.canShare({ files: [file] })) {
          setError("Seu dispositivo não permite compartilhar imagens.");
          setIsSharing(false);
          return;
        }

        await navigator.share({
          files: [file],
          title: "My Achievement",
          text: "Check out my focus session today! 🚀",
        });

        setIsSharing(false);
      }, "image/png");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setIsSharing(false);
    }
  };

  return { captureRef, isSharing, error, shareImage };
};
