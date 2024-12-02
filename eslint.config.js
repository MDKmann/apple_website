import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    "extends": [
      "standard",
      "plugin:react/recommended",
      "plugin:tailwindcss/recommended",
      "prettier"
],
 "rules": {
      "max-len": [2, 250],
      "no-multiple-empty-lines": [
"error",
 {
"max": 1,
"maxEOF": 1
 }
],
      "object-curly-newline": 0
    }
}
]
