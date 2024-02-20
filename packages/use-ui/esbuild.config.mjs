import styleXPlugin from "@stylexjs/esbuild-plugin";
import * as esbuild from "esbuild";

const aliasPlugin = {
  name: "alias",
  setup(build) {
    build.onResolve({ filter: /^useui-ts$/ }, (args) => {
      return { path: path.resolve("node_modules/useui-ts/hooks/index.js") };
    });
    build.onResolve({ filter: /^useui-ts\/components$/ }, (args) => {
      return {
        path: path.resolve("node_modules/useui-ts/components/index.js"),
      };
    });
  },
};

let plugins = [
  aliasPlugin,
  styleXPlugin({
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
  external: ["react", "react-dom"],
  tsconfig: "./tsconfig.build.json",
});
