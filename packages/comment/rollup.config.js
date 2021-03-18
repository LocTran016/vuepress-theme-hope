import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import copy from "rollup-plugin-copy";
import styles from "rollup-plugin-styles";
import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/node/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
    ],
    plugins: [
      typescript({
        declaration: true,
        declarationMap: true,
      }),
      terser(),
    ],
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils"],
  },
  {
    input: "./src/node/index.ts",
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()],
  },
  {
    input: "./src/client/appEnhance.ts",
    output: [
      { file: "./client/appEnhance.js", format: "esm", sourcemap: true },
    ],
    plugins: [
      vue(),
      typescript2({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      terser(),
      copy({
        targets: [{ src: "./src/client/styles/**", dest: "client/styles" }],
      }),
    ],
    external: [
      "@mr-hope/vuepress-plugin-reading-time/client",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "balloon-css",
      "valine",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
  },
  {
    input: "./src/client/appEnhance.ts",
    output: [{ file: "./client/appEnhance.d.ts", format: "esm" }],
    plugins: [dts()],
    external: ["balloon-css", /\.scss$/],
  },
];
