import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { stylexPlugin } from "vite-plugin-stylex-dev";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylexPlugin()],
});
