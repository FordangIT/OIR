import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "chalkboard-green": "#2E5037",
        "dark-slate-gray": "#2F4F4F",
        "chalkboard-black": "#1C1C1C",
        "forest-green": "#228B22",
        "tossback-gray": "#F3F4F6",
        "tosslogo-gray": "#B2B8C0",
        "main-orange": "#F27B26",
        "main-green": "#1B835D",
        "main-red": "#D63A32"
      }
    }
  },
  plugins: [daisyui]
};
export default config;
