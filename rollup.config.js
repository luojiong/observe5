import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import progress from "rollup-plugin-progress";

const BabelExcludes = ["./node_modules/**"];
export default {
  input: "./src/index.ts",
  output: [
    {
      name: "weakMapEmitter",
      dir: "./build",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "./WeakMapEmitter.ts",
      plugins: [process.env.NODE_ENV === "production" && terser()],
    },
  ],
  sourcemap: false,
  plugins: [
    typescript({
      lib: ["es5", "es6", "dom"],
      tsconfig: "./tsconfig.json",
      target: "es6",
      exclude: BabelExcludes,
    }),
    progress({
        clearLine: true, // default: true
      }),
  ],
  exclude: ["./node_modules/**"],
};