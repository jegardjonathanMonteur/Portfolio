"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Curseur du portfolio : un petit point blanc lumineux qui suit la souris,
 * et un anneau bleu qui s'ouvre à chaque clic. La traînée fine est dessinée
 * par CursorFollower.
 *
 * Remis à l'identique de la version en ligne sur jonathanjegard.com
 * (relevée dans le code du site le 25/09/2026), pour que la mise en ligne
 * de la branche vexi-site ne change rien au curseur.
 * Uniquement avec une souris : rien sur téléphone ni tablette.
 */

type Anneau = { id: number; x: number; y: number };

let anneauId = 0;

export function CustomCursor() {
  const [avecSouris, setAvecSouris] = useState(false);
  const [tactile, setTactile] = useState(false);
  const pointRef = useRef<HTMLDivElement>(null);
  const [anneaux, setAnneaux] = useState<Anneau[]>([]);

  useEffect(() => {
    setAvecSouris(window.matchMedia("(pointer: fine)").matches);
    setTactile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    // Le point suit la souris sans retard.
    const onMove = (e: MouseEvent) => {
      const point = pointRef.current;
      if (!point) return;
      point.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(1)`;
    };

    // Un clic : un anneau part du point et s'efface en 0,7 s.
    const onDown = (e: MouseEvent) => {
      const anneau: Anneau = { id: ++anneauId, x: e.clientX, y: e.clientY };
      setAnneaux((prev) => [...prev, anneau]);
      setTimeout(() => {
        setAnneaux((prev) => prev.filter((a) => a.id !== anneau.id));
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  if (!avecSouris || tactile) return null;

  return (
    <>
      <div
        ref={pointRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.45)",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
      <AnimatePresence>
        {anneaux.map((a) => (
          <motion.div
            key={a.id}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none fixed rounded-full"
            style={{
              left: a.x,
              top: a.y,
              width: 110,
              height: 110,
              marginLeft: -55,
              marginTop: -55,
              border: "2px solid rgba(74, 111, 227, 0.9)",
              background: "transparent",
              zIndex: 99998,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
