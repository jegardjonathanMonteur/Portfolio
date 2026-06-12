import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ADN lac / brume / nuit — cinéma Villeneuve */
        "night-blue": "#0B1729",
        "violet-mist": "#B8A8D0",
        "fog-black": "#0B1729",
        "fog-soft": "#0D1B30",
        "fog-cream": "#F5F1E8",
        "fog-mist": "#A8A29A",
        "fog-cold": "#6B6862",
        /* Alias */
        night: "#0B1729",
        "night-deep": "#0D1B30",
        "night-soft": "#0D1B30",
        cream: "#F5F1E8",
        "cream-muted": "#A8A29A",
        lavender: "#A8A29A",
        border: "rgba(232, 224, 208, 0.1)",
      },
      fontFamily: {
        display: ["var(--font-gohdtail)", "Ghodtail", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        "silk-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(2%, -1%) scale(1.05)" },
        },
        "silk-shift": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "shiny-sweep": {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        "silk-drift": "silk-drift 18s ease-in-out infinite alternate",
        "silk-shift": "silk-shift 24s linear infinite",
        "shiny-sweep": "shiny-sweep 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
