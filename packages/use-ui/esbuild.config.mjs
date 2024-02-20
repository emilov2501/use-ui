import styleXPlugin from "@stylexjs/esbuild-plugin";
import * as esbuild from "esbuild";

let plugins = [
  styleXPlugin({
    dev: false,
    useRemForFontSize: true,
    classNamePrefix: "UI",
    generatedCSSFileName: "./dist/components/styles.css",
  }),
];

// Плагин для алиасов

await esbuild.build({
  entryPoints: {
    "hooks/index": "./hooks/index.ts",
    "components/index": "./components/index.ts",
  },
  outdir: "dist",
  splitting: true,
  bundle: true,
  format: "esm",
  minify: true,
  treeShaking: true,
  plugins: [...plugins],
  loader: {
    ".js": "jsx", // Для обработки JSX
    ".css": "css", // Для обработки CSS
  },
  external: ["react", "react-dom"],
  tsconfig: "./tsconfig.build.json",
});
