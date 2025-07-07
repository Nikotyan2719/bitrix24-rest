/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-html",
  ],
  rules: {
    "color-named": "never",
    "selector-class-pattern": [
      "^[^A-Z]+$",
      { message: "Имена классов не должны содержать заглавных букв (например, MyClass)." },
    ],
    "at-rule-no-deprecated": false,
    "scss/at-rule-no-unknown": ["@tailwind"],
  },
  ignoreFiles: [
    "dist/**",
    "node_modules/**",
    "**/*.js",
    "**/*.ts",
  ],
};