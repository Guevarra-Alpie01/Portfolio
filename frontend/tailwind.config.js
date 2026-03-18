/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f11",
        ember: "#f26c61",
        emberSoft: "#ffb09f",
        sand: "#f6eee8",
        mist: "#c4b8b0",
        steel: "#1b1b1f",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(242, 108, 97, 0.18)",
      },
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(242,108,97,0.28), transparent 32%), radial-gradient(circle at right center, rgba(255,255,255,0.08), transparent 20%), linear-gradient(135deg, #121214 0%, #101010 48%, #181213 100%)",
      },
    },
  },
  plugins: [],
};
