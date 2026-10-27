/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.12)",
        input: "rgba(255, 255, 255, 0.15)",
        ring: "#38E0CF",
        background: "#01262D",
        foreground: "#f1f5f9",
        primary: {
          DEFAULT: "#38E0CF",
          foreground: "#01262D",
        },
        secondary: {
          DEFAULT: "#0B4A75",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#021a1f",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "rgba(56, 224, 207, 0.15)",
          foreground: "#38E0CF",
        },
        card: {
          DEFAULT: "#021a1f",
          foreground: "#f1f5f9",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  corePlugins: {
    // Preserve existing site CSS and prevent Tailwind CSS reset from resetting headings/buttons
    preflight: false,
  },
  plugins: [],
}
