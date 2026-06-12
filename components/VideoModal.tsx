"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
};

export function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(new CustomEvent("video-playing"));
      document.body.style.overflow = "hidden";
    } else {
      document.dispatchEvent(new CustomEvent("video-ended"));
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, handleKeydown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          data-cursor="video"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 text-2xl text-white transition-opacity duration-200 hover:opacity-70"
            aria-label="Fermer"
          >
            ✕
          </button>

          <div
            className="relative w-full max-w-[90vw] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full rounded-sm"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
