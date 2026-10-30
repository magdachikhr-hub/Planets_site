import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
//import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // visualizer({
    //   open: true,
    //   filename: "dist/stats.html", // Where the report file will be saved
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
});
