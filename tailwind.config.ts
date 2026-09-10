import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kshudarth brand palette
        terracotta: "#862B01",
        rust: "#5C1C01",
        espresso: "#3C1201",
        copper: "#9D4714",
        copperLight: "#C0642A",
        gold: "#E08036",
        champagne: "#F0B36A",
        cream: "#F7E6CF",
      },
      fontFamily: {
        // Wired to next/font CSS variables in app/layout.tsx
        cinzel: ["var(--font-cinzel)", "serif"],
        garamond: ["var(--font-garamond)", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "14px",
      },
      boxShadow: {
        warm: "0 20px 50px -12px rgba(60, 18, 1, 0.65)",
        "warm-lg": "0 30px 80px -20px rgba(0, 0, 0, 0.6)",
        gold: "0 12px 34px -8px rgba(224, 128, 54, 0.45)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F0B36A 0%, #E08036 100%)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
