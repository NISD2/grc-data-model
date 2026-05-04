import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/ropa/index.ts",
    "src/dpa/index.ts",
    "src/toms/index.ts",
    "src/supplier/index.ts",
    "src/asset/index.ts",
    "src/risk/index.ts",
    "src/incident/index.ts",
    "src/frameworks/index.ts",
    "src/satisfaction-pairs.ts",
    "src/mappings/nis2-gdpr.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
});
