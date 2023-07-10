import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import progress from "rollup-plugin-progress";

const BabelExcludes = ["./node_modules/**"];
export default {
  input: "./observe5.ts",
  output: [
    {
      name: "observe5",
      file:"./build/observe5.esm.js",
      format: "esm",
      plugins:[terser()]
    },
    {
      name: "observe5",
      file:"./build/observe5.cjs.js",
      format: "cjs",
      plugins:[terser()]
    },
  ],
  sourcemap: process.env.NODE_ENV === "production" ? false : "inline",
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      lib: ["es5", "es6", "dom"],
      tsconfig: "./tsconfig.json",
      target: "es5",
      exclude: BabelExcludes,
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".ts", ".js"],
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    }),
    replace({
      exclude: "node_modules/**",
      preventAssignment: true,
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    progress({
      clearLine: true, // default: true
    }),
    visualizer({
      emitFile: true,
      dir:"./",
      filename: "stats.html",
    }),
  ],
  exclude: ["./node_modules/**"],
};