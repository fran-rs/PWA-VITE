import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist'],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      importPlugin.configs.recommended,
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'import/no-unresolved': 'error', // ⛔ marca imports rotos
      'react/react-in-jsx-scope': 'off', // requerido para Vite + JSX auto
    },
  },
])
