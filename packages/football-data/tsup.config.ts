import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],

  clean: true,

  dts: true,

  format: ["esm", "cjs"],

  sourcemap: true,

  treeshake: true,

  splitting: false,

  target: "es2022"
});
