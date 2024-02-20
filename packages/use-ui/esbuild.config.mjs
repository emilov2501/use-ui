import styleXPlugin from "@stylexjs/esbuild-plugin";
import * as esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };

// Определение режима сборки
const isProd = process.env.NODE_ENV === "production";

let plugins = [];

if (isProd) {
  plugins.push(
    styleXPlugin({
      generatedCSSFileName: "./dist/components/styles.css",
    })
  );
  // Можно добавить другие плагины или настройки, специфичные для продакшена
}
// Плагин для алиасов
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

await esbuild.build({
  entryPoints: ["./hooks/index.ts", "./components/index"],
  outdir: "dist",
  splitting: true,
  bundle: true,
  format: "esm",
  minify: true,
  treeShaking: true,
  plugins: [aliasPlugin, ...plugins],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  tsconfig: "./tsconfig.build.json",
});
