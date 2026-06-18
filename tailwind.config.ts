import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          black: "#080810",
          dark: "#0e0e1a",
          card: "#13131f",
          border: "#1e1e30",
          purple: "#7c3aed",
          "purple-light": "#a855f7",
          blue: "#2563eb",
          cyan: "#06b6d4",
          glow: "#8b5cf6",
          text: "#e2e8f0",
          muted: "#64748b",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-velora":
          "linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, rgba(13,13,26,0) 100%)",
        "gradient-glow":
          "radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.35)",
        "glow-sm": "0 0 10px rgba(124,58,237,0.25)",
        "glow-cyan": "0 0 20px rgba(6,182,212,0.3)",
        card: "0 4px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float-up": "float-up 0.6s ease-out forwards",
        "spin-slow": "spin 3s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(124,58,237,0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(124,58,237,0.6)" },
        },
        "float-up": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-60px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
