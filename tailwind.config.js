module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-dark": "#08457D",
        white: "#FFFFFF",
        "title-black": "#12172B",
        "subtitle-gray": "#61636E",
        "background-blue": "#2D6EB7",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        acumin: ["acumin-pro", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
      },
      height: {
        page: "52rem",
        136: "34rem",
      },
      inset: {
        240: "60rem",
        "40px": "40px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
