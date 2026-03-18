/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        ember: "rgb(var(--color-ember) / <alpha-value>)",
        emberSoft: "rgb(var(--color-ember-soft) / <alpha-value>)",
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        steel: "rgb(var(--color-steel) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 20px 80px rgb(var(--shadow-glow) / 0.22)",
      },
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        mesh: "var(--hero-mesh)",
      },
    },
  },
  plugins: [],
};
