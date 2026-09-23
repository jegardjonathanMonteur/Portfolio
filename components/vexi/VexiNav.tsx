"use client";

import { VEXI_NAV } from "@/lib/vexi";
import { useEffect, useState } from "react";

export function VexiNav() {
  const [active, setActive] = useState("presentation");

  useEffect(() => {
    const TOP_THRESHOLD = 48;
    const isAtTop = () => window.scrollY <= TOP_THRESHOLD;

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (isAtTop()) {
          setActive("presentation");
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      if (isAtTop()) setActive("presentation");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="vexi-subnav" aria-label="Sections Vexi">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center gap-6 px-4 sm:gap-10">
        {VEXI_NAV.map((link) => {
          const isActive = active === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`relative font-sans text-[11px] uppercase tracking-[0.16em] transition-opacity duration-300 sm:text-sm ${
                isActive ? "text-[#E8E0D0]" : "text-[#E8E0D0]/60 hover:opacity-80"
              }`}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 right-0 h-px bg-vexi-accent transition-transform duration-300"
                style={{
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
