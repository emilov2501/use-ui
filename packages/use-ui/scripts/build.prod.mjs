import * as esbuild from "esbuild";
import CssModulesPlugin from "esbuild-css-modules-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let plugins = [
  CssModulesPlugin({
    localsConvention: "camelCaseOnly",
  }),
];

// Плагин для алиасов

await esbuild.build({
  metafile: true,
  entryPoints: {
    "hooks/index": path.resolve(__dirname, "..", "hooks/index.ts"),
    "components/index": path.resolve(__dirname, "..", "components/index.ts"),
  },
  outdir: "dist",
  splitting: true,
  bundle: true,
  sourcemap: false,
  format: "esm",
  define: {
    "process.env.NODE_ENV": "'production'",
  },
  minify: true,
  treeShaking: true,
  plugins,
  external: ["react", "react-dom"],
  tsconfig: path.resolve(__dirname, "..", "tsconfig.build.json"),
});
