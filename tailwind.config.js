module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-dark": "#08457D",
        "theme-light": "#0086CB",
        white: "#FFFFFF",
        "title-black": "#12172B",
        "subtitle-gray": "#61636E",
        "hr-gray": "#F1F1F1",
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
        page_md: "42rem",
        136: "34rem",
      },
      margin: {
        gap: "16rem",
      },
      zIndex: {
        bg: "1",
        clouds: "2",
        content: "3",
        overlay: "4",
      },
      fontSize: {
        "4xl": "2.25rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
