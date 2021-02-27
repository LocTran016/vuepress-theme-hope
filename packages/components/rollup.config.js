import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import styles from "rollup-plugin-styles";
import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/client/root-components/BackToTop.vue",
    output: [
      {
        file: "./client/root-components/BackToTop.js",
        format: "esm",
        sourcemap: true,
      },
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
      styles(),
      terser(),
    ],
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/composables",
      "lodash.debounce",
      "vue",
    ],
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
      styles(),
      terser(),
    ],
    external: [
      "@mr-hope/vuepress-shared/client",
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/composables",
      "vue",
      "vue-router",
      "screenfull",
    ],
  },
  {
    input: "./src/client/appEnhance.ts",
    output: [
      { file: "./client/appEnhance.d.ts", format: "esm", sourcemap: true },
    ],
    plugins: [vue(), dts()],
    external: [
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/composables",
      "vue",
      "vue-router",
      "screenfull",
    ],
  },
  {
    input: "./src/node/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
    ],
    plugins: [typescript(), terser()],
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "lodash.debounce",
      "vue",
    ],
  },
  {
    input: "./src/node/index.ts",
    output: [{ file: pkg.types, format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
];
