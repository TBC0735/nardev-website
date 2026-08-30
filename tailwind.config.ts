import type { Config } from "tailwindcss";

// Charte graphique Nardev (cf. cahier des charges v2, section 1)
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marine: "#10172A", // logo, titres, header/footer
        bleu: "#2563EB", // logo, boutons, liens, éléments actifs
        texte: "#111827", // texte courant
        "texte-secondaire": "#6B7280", // descriptions
        "fond-alt": "#F9FAFB", // fond de section alternée
        bordure: "#E5E7EB", // bordures / séparateurs
        succes: "#16A34A", // disponibilité / succès
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px", // coins arrondis discrets
      },
    },
  },
  plugins: [],
};
export default config;
