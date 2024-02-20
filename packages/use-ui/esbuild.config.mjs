import * as esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };
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
  plugins: [aliasPlugin],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  tsconfig: "./tsconfig.build.json",
});
