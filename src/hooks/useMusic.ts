import { useCallback, useEffect, useRef, useState } from "react";
import laguMp3 from "../components/images/lagu.mp3";

export const useMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.src = laguMp3;
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      if (error instanceof DOMException && error.name === "NotAllowedError") return;
      console.error("Unable to start wedding music.", error);
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    await startMusic();
  }, [startMusic]);

  return { isPlaying, startMusic, toggleMusic };
};
