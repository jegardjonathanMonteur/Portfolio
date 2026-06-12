"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  title: string;
  showSoundToggle?: boolean;
  containerClassName?: string;
  objectFit?: "cover" | "contain";
};

export function VideoPlayer({
  src,
  title,
  showSoundToggle = false,
  containerClassName = "aspect-video",
  objectFit = "cover",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void v.requestFullscreen();
    }
  }, []);

  const handleEnter = useCallback(() => {
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleLeave = useCallback(() => {
    if (playing) {
      timerRef.current = setTimeout(() => setVisible(false), 2000);
    }
  }, [playing]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    document.dispatchEvent(new CustomEvent("video-playing"));
    return () => {
      document.dispatchEvent(new CustomEvent("video-ended"));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      data-cursor="video"
      className={`group relative mt-6 w-full overflow-hidden rounded-sm ${containerClassName}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ cursor: "none" }}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full"
        style={{ objectFit, cursor: "none" }}
        aria-label={title}
      />

      <button
        onClick={toggle}
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label={playing ? "Pause" : "Play"}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50">
          {playing ? (
            <span className="flex items-center gap-1.5">
              <span className="block h-5 w-[3px] rounded-sm bg-white" />
              <span className="block h-5 w-[3px] rounded-sm bg-white" />
            </span>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-0.5"
            >
              <polygon points="6,3 20,12 6,21" />
            </svg>
          )}
        </span>
      </button>

      <button
        onClick={toggleFullscreen}
        className="absolute bottom-3 left-3 z-10 rounded-md bg-black/50 px-3 py-2 text-white transition-opacity duration-200"
        aria-label="Plein écran"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 00-2 2v3" />
          <path d="M21 8V5a2 2 0 00-2-2h-3" />
          <path d="M16 21h3a2 2 0 002-2v-3" />
          <path d="M3 16v3a2 2 0 002 2h3" />
        </svg>
      </button>

      {showSoundToggle && (
        <button
          onClick={toggleSound}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-md bg-black/50 px-3 py-2 text-white transition-opacity duration-200"
          aria-label={muted ? "Activer le son" : "Couper le son"}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 010 14.14" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
