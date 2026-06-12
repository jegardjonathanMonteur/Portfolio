"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VOLUME = 0.25;

export function SoundToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOn, setIsOn] = useState(false);
  const wasPausedByVideo = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = VOLUME;
      audio.play().then(() => setIsOn(true)).catch(() => {});
      audio.addEventListener("ended", () => setIsOn(false));
    }

    const onVideoPlaying = () => {
      const a = audioRef.current;
      if (a && !a.paused) {
        wasPausedByVideo.current = true;
        a.pause();
      }
    };
    const onVideoEnded = () => {
      if (wasPausedByVideo.current) {
        wasPausedByVideo.current = false;
        const a = audioRef.current;
        if (a) void a.play().then(() => {}).catch(() => {});
      }
    };
    document.addEventListener("video-playing", onVideoPlaying);
    document.addEventListener("video-ended", onVideoEnded);
    return () => {
      document.removeEventListener("video-playing", onVideoPlaying);
      document.removeEventListener("video-ended", onVideoEnded);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;

    if (audio.paused) {
      void audio.play().then(() => setIsOn(true)).catch(() => setIsOn(false));
    } else {
      audio.pause();
      setIsOn(false);
    }
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        preload="auto"
        className="hidden"
        aria-hidden
      />

      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-black/60 px-5 py-3 text-sm uppercase tracking-[0.2em] text-cream shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/70"
        aria-pressed={isOn}
        aria-label={isOn ? "Couper le son ambiant" : "Activer le son ambiant"}
      >
        <span
          className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
            isOn
              ? "bg-lavender shadow-[0_0_8px_2px_rgba(168,200,232,0.5)]"
              : "bg-cream-muted/30"
          }`}
          aria-hidden
        />
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-cream">
          SOUND — {isOn ? "ON" : "OFF"}
        </span>
      </button>
    </>
  );
}
