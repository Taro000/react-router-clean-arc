import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReactConfig from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    pluginReactConfig,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      import: importPlugin,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "no-empty-pattern": "off",
    },
  },
];
