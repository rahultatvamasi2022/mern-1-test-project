/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundColor: {
      headerBackground: "#002245",
      buttonBackground: "#69D600",
      white: "#ffffff",
      navBackground: "#EFF1F3",
    },
    fontSize: {
      sm: "12px",
      md: "14px",
      lg: "18px",
      xl: "23px",
    },
    textColor: {
      primary: "#002245",
      secondary: "#5A5968",
      ternary: "#6C7293",
      green: "##69D600",
      white: "#ffffff",
    },
    borderColor: {
      primaryBorder: "#69D600",
      secondaryBorder: "#EFF1F3",
      headerBorder: "rgba(192, 192, 206, 0.5)",
      inputBorder: "#002245",
    },
    extend: {},
  },
  plugins: [],
};
