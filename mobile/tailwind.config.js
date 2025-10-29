/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",

    // ✅ covers all files inside app/ (even deeply nested folders like (auth), (tabs), etc.)
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",

    // ✅ components and src folders (optional)
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",

    // ✅ global styles or utils (optional if you have .jsx helpers)
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],

  

  plugins: [],
};
