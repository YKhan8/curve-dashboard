/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gemunu Libre', 'sans-serif'], // This makes Gemunu Libre the default font
      },
      fontSize: {
        // Increase all default font sizes by 3px
        'xs': ['0.875rem', '1.25rem'],     // 14px -> 17px
        'sm': ['1rem', '1.5rem'],          // 16px -> 19px
        'base': ['1.188rem', '1.75rem'],   // 19px -> 22px
        'lg': ['1.313rem', '1.875rem'],    // 21px -> 24px
        'xl': ['1.438rem', '2rem'],        // 23px -> 26px
        '2xl': ['1.688rem', '2.25rem'],    // 27px -> 30px
        '3xl': ['1.938rem', '2.375rem'],   // 31px -> 34px
        '4xl': ['2.188rem', '2.5rem'],     // 35px -> 38px
        '5xl': ['2.438rem', '1'],          // 39px -> 42px
        '6xl': ['2.688rem', '1'],          // 43px -> 46px
      },
      colors: {
        kpmg: {
          'blue-primary': '#00338D',    // KPMG Primary Blue
          'blue-medium': '#005EB8',     // Medium Blue
          'blue-light': '#0091DA',      // Light Blue
          'violet': '#2105C',           // Violet
          'purple': '#2617C',           // Purple
          'purple-light': '#259C',      // Light Purple
          'green': '#00A3A1',           // Green
          'text': '#2E2E38',           // Text color
          'bg': '#F2F2F2',             // Background color
        },
      },
    },
  },
  plugins: [],
}