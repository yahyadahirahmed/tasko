import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kanban: "var(--kanban)",
        bluye: "var(--bluye)",
        greeney: "var(--greeney)",
        greyey: "var(--greyey)",
        black: "var(--black)",
      },
    },
  },
  plugins: [],
} satisfies Config;
