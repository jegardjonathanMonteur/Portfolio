"use client";

import { useEffect } from "react";

type Particle = {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

const COLORS = ["#F5F0E8", "#B8A8D0"];

export function ClickParticles() {
  useEffect(() => {
    const particles: Particle[] = [];
    let raf = 0;

    const handleClick = (e: MouseEvent) => {
      const count = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const color = COLORS[i % COLORS.length];
        const size = 2 + Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const maxLife = 600 + Math.random() * 200;

        el.style.cssText = [
          "position:fixed",
          `left:${e.clientX}px`,
          `top:${e.clientY}px`,
          `width:${size}px`,
          `height:${size}px`,
          `background:${color}`,
          "border-radius:50%",
          "pointer-events:none",
          "z-index:9999",
          "opacity:0.8",
        ].join(";");

        document.body.appendChild(el);

        particles.push({
          el,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife,
        });
      }
    };

    document.addEventListener("mousedown", handleClick);

    const animate = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 16;
        const t = Math.min(p.life / p.maxLife, 1);

        if (t >= 1) {
          p.el.remove();
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy + 0.15;
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.el.style.left = `${p.x}px`;
        p.el.style.top = `${p.y}px`;
        p.el.style.opacity = `${0.8 * (1 - t)}`;
        p.el.style.transform = `scale(${1 - t * 0.5})`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(raf);
      particles.forEach((p) => p.el.remove());
    };
  }, []);

  return null;
}
