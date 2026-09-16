import type { Config } from "tailwindcss";

// Système de design Nardev — direction « Signal », inspirée du logo
// (navy + bleu électrique + étincelle ✦ + maillon de chaîne).
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy — fonds sombres, titres, header/footer
        marine: {
          DEFAULT: "#10172A",
          800: "#151E38",
          700: "#1E2A4A",
          600: "#2A3A63",
        },
        // Bleu électrique — action, liens, éléments actifs
        bleu: {
          DEFAULT: "#2563EB",
          600: "#1D4ED8",
          500: "#3B82F6",
          400: "#60A5FA",
          300: "#93C5FD",
        },
        ciel: "#EEF4FF", // bleu très clair — fonds de section, chips
        texte: "#111827",
        "texte-secondaire": "#5B6472",
        "fond-alt": "#F7F9FC",
        bordure: "#E6E9F0",
        succes: "#16A34A",
        erreur: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["4rem", { lineHeight: "1.03", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        DEFAULT: "10px",
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,23,42,0.04), 0 8px 24px -12px rgba(16,23,42,0.10)",
        "card-hover":
          "0 2px 4px rgba(16,23,42,0.05), 0 18px 40px -16px rgba(37,99,235,0.28)",
        glow: "0 0 0 1px rgba(37,99,235,0.15), 0 20px 60px -20px rgba(37,99,235,0.45)",
      },
      backgroundImage: {
        "grid-dots":
          "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
        "grid-dots-dark":
          "radial-gradient(rgba(16,23,42,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.4)" },
          "60%": { transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spark-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.35s ease-out both",
        "rise-in": "reveal-up 0.45s ease-out both",
        "spark-pulse": "spark-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "dash-flow": "dash-flow 1s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
