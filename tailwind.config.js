/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      bg: "#1D232A",
      "bg-50": "#272E36",
      "bg-100": "#2C3540",
      "bg-200": "#323D49",
      "bg-dark": "#1A2229",
      "text-primary": "#FFFFFF",
      "text-secondary": "#A6A6A6",
      disabled: "#BABABA",
      "post-bg": "#81BCE0",
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6b22cf",

          secondary: "#ec4899",

          accent: "#2dd4bf",

          neutral: "#2C3540",

          "base-100": "#1D232A",

          info: "#1d4ed8",

          success: "#00ff00",

          warning: "#eab308",

          error: "#ff0000",
        },
      },
    ],
  },
};
