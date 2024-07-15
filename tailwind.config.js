/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0057FF",
          100: "#002F8A",
        },
        secondary: "#39D2C0",
        tertiary: "#EE8B60",
        alternate: "#E0E3E7",
        primaryText: "#FFFFFF",
        secondaryText: "#95A1AC",
        background: "#1D2428",
        secondaryBackground: "#14181B",
        accent1: "#4B39EF",
        accent2: "#249689",
        accent3: "#EE8B60",
        accent4: "#57636C",
      },
      fontFamily: {
        dbold: ["SFDisplay-Bold", "sans-serif"],
        dlight: ["SFDisplay-Light", "sans-serif"],
        dmedium: ["SFDisplay-Medium", "sans-serif"],
        dregular: ["SFDisplay-Regular", "sans-serif"],
        tbold: ["SFText-Bold", "sans-serif"],
        tlight: ["SFText-Light", "sans-serif"],
        tmedium: ["SFText-Medium", "sans-serif"],
        tregular: ["SFText-Regular", "sans-serif"],
      },

    },
  },
  plugins: [],
};
