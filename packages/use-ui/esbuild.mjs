import * as esbuild from 'esbuild';
import pkg from "./package.json" assert { type: "json" };

await esbuild.build({
  entryPoints: ['lib/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'cjs',
  minify: true,
  treeShaking: true,
  tsconfig: './tsconfig.build.json',
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies || {})
  ],
})

await esbuild.build({
  entryPoints: ['lib/index.ts'],
  outfile: 'dist/index.mjs',
  bundle: true,
  format: "esm",
  minify: true,
  treeShaking: true,
  tsconfig: './tsconfig.build.json',
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies || {})
  ],
})