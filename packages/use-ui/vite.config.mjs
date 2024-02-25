import fs from "fs";
import { minify } from "terser";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { viteStaticCopy } from "vite-plugin-static-copy";
const componentFiles = fs
  .readdirSync("./lib")
  .filter((file) => file.includes("App"));

const hookFiles = fs
  .readdirSync("./lib")
  .filter((file) => file.includes("use"));

const components = componentFiles.reduce((obj, component) => {
  obj[component.split(".")[0]] = `lib/${component}/index.ts`;

  return obj;
}, {});

const hooks = hookFiles.reduce((obj, hook) => {
  obj[hook.split(".")[0]] = `lib/${hook}/index.ts`;

  return obj;
}, {});

export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [
    libInjectCss(),
    dts({
      entryRoot: "./lib",
      tsconfigPath: "./tsconfig.build.json",
    }),
    minifyBundles(),
    viteStaticCopy({
      targets: [
        {
          src: "lib/index.ts",
          dest: "",
          rename: "index.js",
          transform: (content) => content.toString().replace(/.tsx/g, ""),
        },
        {
          src: "lib/index.js",
          dest: "",
          rename: "index.d.ts",
          transform: (content) => content.toString().replace(/.tsx/g, ""),
        },
        {
          src: "assets/styles.css",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    target: "esnext",
    cssCodeSplit: true,
    cssMinify: true,
    minify: true,
    lib: {
      entry: {
        ...hooks,
        ...components,
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      output: {
        entryFileNames: `[name]/index.js`,
        assetFileNames: `[name]/[name].[ext]`,
      },
    },
  },
});

function minifyBundles() {
  return {
    name: "minifyBundles",
    async generateBundle(options, bundle) {
      for (let key in bundle) {
        if (bundle[key].type == "chunk") {
          const minifyCode = await minify(bundle[key].code, {
            sourceMap: false,
            compress: true,
            mangle: true,
          });
          bundle[key].code = minifyCode.code;
        }
      }
      return bundle;
    },
  };
}
