import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Permite acceder desde cualquier IP (incluyendo WSL)
    port: 3000,        // El puerto que estás usando
  }
});

