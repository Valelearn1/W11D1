import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/W11D1/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
}));
