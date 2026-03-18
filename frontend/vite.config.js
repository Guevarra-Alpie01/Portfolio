import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite keeps the React frontend simple for beginners while staying fast.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/static/" : "/",
  server: {
    port: 5173,
  },
}));
