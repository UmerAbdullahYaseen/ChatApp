import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Add Node.js globals including 'process'
        ...globals.browser, // Also include browser globals if needed
        ...globals.jest
      },
    },
  },
  pluginJs.configs.recommended,
];
