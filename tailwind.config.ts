import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        light: "#DAD8D7",
        darkness: "#000001",
        juice: "#ea6725",
        "light-juice": "#e59166",
        silver: "#525253",
      },
    },
    keyframes: {
      // BURGER MENU ANIMATION
      menuFirst: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(315deg)" },
      },
      menuThird: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(-315deg)" },
      },
      // CART AND SEARCH SLIDE
      openFromRight: {
        from: { right: "-100%" },
        to: { right: "0" },
      },
      closeToRight: {
        from: { right: "0" },
        to: { right: "-100%" },
      },
      openFromTop: {
        from: { top: "-30%" },
        to: { top: "10rem" },
      },
      closeToTop: {
        from: { top: "10rem" },
        to: { top: "-30%" },
      },
    },
    animation: {
      menuFirst: "menuFirst .3s linear forwards ",
      menuThird: "menuThird .3s linear forwards ",
      openFromRight: "openFromRight .3s ease-in forwards ",
      closeToRight: "closeToRight .3s ease-in forwards ",
      openFromTop: "openFromTop .3s ease-in forwards ",
      closeToTop: "closeToTop .3s ease-in forwards ",
    },
    fontFamily: {
      main: ["Lato", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
