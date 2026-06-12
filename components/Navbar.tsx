"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À Propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-12 py-6 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(11, 23, 41, 0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="flex items-center justify-between">
          <a
            href="#accueil"
            onClick={(e) => handleNav(e, "#accueil")}
            className="font-display text-2xl text-[#E8E0D0] transition-opacity duration-300 hover:opacity-70"
          >
            {SITE.initials}
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="group relative font-sans text-sm tracking-wide text-[#E8E0D0] transition-opacity duration-300 hover:opacity-70"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#E8E0D0] transition-transform duration-300"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                    }}
                    onTransitionEnd={() => {}}
                  />
                  <span className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 bg-[#E8E0D0] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8E0D0] transition-colors duration-300 hover:text-[#3B5BFF]"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8E0D0] transition-colors duration-300 hover:text-[#3B5BFF]"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="ml-2 rounded-full bg-[#3B5BFF] px-6 py-2.5 font-sans text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,91,255,0.4)]"
            >
              Me contacter
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-[#E8E0D0] transition-opacity duration-300 hover:opacity-70 md:hidden"
            aria-label="Menu"
          >
            <BurgerIcon />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: "#0B1729" }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-8 top-8 text-[#E8E0D0] transition-opacity duration-300 hover:opacity-70"
              aria-label="Fermer"
            >
              <CloseIcon />
            </button>
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
                  className="font-display text-5xl text-[#E8E0D0] transition-all duration-300 hover:text-[#3B5BFF] md:text-7xl"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
