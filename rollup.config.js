import { terser } from "rollup-plugin-terser";

export default {
  entry: 'src/main.js',
  dest: '_site/js/min.js',
  format: 'iife',
  sourceMap: 'inline',
};
