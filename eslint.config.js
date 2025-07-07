import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";
export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "astro/no-unused-css-selector": ["error"],
      "astro/prefer-class-list-directive": ["error"],

      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "max-len": ["error", {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
      }],
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "no-console": ["warn", { allow: ["error"] }],
      "no-unused-vars": ["error"],
      "no-multiple-empty-lines": ["error"],
      "no-duplicate-imports": ["error"],
      "no-empty": ["error"],
    },
  },
]);