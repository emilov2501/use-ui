import fs from "fs";
import { minify } from "terser";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { viteStaticCopy } from "vite-plugin-static-copy";
import pkg from "./package.json";

const componentFiles = fs
  .readdirSync("./lib/components")
  .filter((value) => !value.includes("index"));

const hookFiles = fs
  .readdirSync("./lib/hooks")
  .filter((value) => !value.includes("index"));

const components = componentFiles.reduce((obj, component) => {
  obj[
    `components/${component.split(".")[0]}`
  ] = `lib/components/${component}/index.ts`;

  return obj;
}, {});

const hooks = hookFiles.reduce((obj, hook) => {
  obj[`hooks/${hook.split(".")[0]}`] = `lib/hooks/${hook}/index.ts`;

  return obj;
}, {});

export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [
    libInjectCss({
      minify: true,
    }),
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
    cssCodeSplit: true,
    minify: true,
    lib: {
      entry: {
        ...hooks,
        ...components,
      },
      name: "useui",
      formats: ["es"],
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        entryFileNames: `[name]/index.js`,
        assetFileNames: `[name]/[name].[ext]`,
        chunkFileNames: (chunk) => {
          if (chunk.name.includes("use")) {
            return `hooks/[name]/[name]-[hash].js`;
          }
          return chunk.name;
        },
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
