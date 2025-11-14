import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReactConfig from "eslint-plugin-react";

export default [
  // ビルド成果物を除外
  {
    ignores: ["build/**", "dist/**", ".react-router/**"],
  },
  // TypeScript ESLint の推奨設定（配列）を最上位で展開
  ...tseslint.configs.recommended,
  // React プラグインのFlat推奨設定を展開
  pluginReactConfig.configs.flat.recommended,
  // Prettier との競合を無効化
  eslintConfigPrettier,
  // 追加のプロジェクト固有ルール
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-empty-pattern": "off",
    },
  },
];
