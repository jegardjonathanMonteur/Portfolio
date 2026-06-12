"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Projets", href: "#projets" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      onClose();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(11, 23, 41, 0.98)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <nav className="flex flex-col items-center gap-8 md:gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="font-display text-5xl text-[#F5F0E8] transition-all duration-300 hover:text-[#B8A8D0] hover:translate-x-[10px] md:text-7xl"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
