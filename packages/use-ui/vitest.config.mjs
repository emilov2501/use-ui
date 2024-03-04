import { defineConfig, mergeConfig } from "vite";
import viteConfig from "./vite.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
    },
  })
);
