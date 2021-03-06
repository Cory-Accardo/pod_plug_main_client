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
        "background-blue": "#08457D",
        "background-gray": "#F5F4F4",
        "title-blue-dark": "#12172B",
        "title-blue-light": "#08457D",
        "button-emphasis": "#DDE8FC",
        "button-hover": "#80A6E0",
        "header-black": "#12172B",
        "myaccount-gray": "#ECE6E2",
        "signup-yellow": "#FFDE88",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        acumin: ["acumin-pro", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
      },
      width: {
        112: "28rem",
        184: "46rem",
      },
      height: {
        page: "52rem",
        page_md: "42rem",
        29: "7.25rem",
        38: "9.5rem",
        136: "34rem",
        140: "35rem",
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
        "2.9xl": ["1.8rem", "2.1rem"],
        "3.9xl": ["2.1rem", "2.6rem"],
        "4.5xl": ["2.5rem", "2.75rem"],
        "4.9xl": "2.8rem",
      },
      minWidth: {
        5: "1.25rem",
        48: "12rem",
        56: "14rem",
      },
      minHeight: {
        5: "1.25rem",
      },
      maxWidth: {
        32: "8rem",
        128: "32rem",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
