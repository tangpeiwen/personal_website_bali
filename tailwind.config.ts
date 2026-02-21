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
        "volt": "#CCFF00",
        "dark-grey": "#121212",
        "black": "#000000",
        "white": "#FFFFFF",
      },
      fontFamily: {
        ranchers: ["Ranchers", "cursive"],
        mono: ["Space Mono", "monospace"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        "neo-8": "8px 8px 0px 0px #000000",
        "neo-white-8": "8px 8px 0px 0px #FFFFFF",
        "neo-4": "4px 4px 0px 0px #000000",
      },
      borderWidth: {
        "4": "4px",
        "8": "8px",
      },
    },
  },
  plugins: [],
};
export default config;
