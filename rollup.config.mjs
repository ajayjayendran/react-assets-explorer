import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import preserveShebang from "rollup-plugin-preserve-shebang";

export default {
  input: "cli/index.mjs",
  output: [
    {
      file: "dist/cli/index.mjs", // Ensure this path is correct
      format: "cjs", // CommonJS format for CLI
      sourcemap: true,
      exports: "auto",
    },
  ],
  plugins: [
    preserveShebang(), // Preserve the shebang line
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      module: "ESNext", // Let Rollup handle module conversion
      declaration: false, // Disable declaration files for CLI
    }),
    postcss(),
  ],
  external: ["commander", "express", "react", "react-dom"],
};
