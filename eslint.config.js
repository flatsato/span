// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  {
    ignores: ["dist/", ".astro/", "_legacy/", "node_modules/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // 未定義参照の検出は TypeScript / astro check に委ねる（DOM 型などの誤検知を防ぐ）
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
);
