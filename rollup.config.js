import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.js",
  output: [
    {
      format: "iife",
      sourcemap: true,
      plugins: [terser()],
    },
  ],
};
