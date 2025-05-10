import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] }, // Ignore the dist/ folder (build output)
  {
    files: ['**/*.{js,jsx}'], // Apply to JS and JSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Browser globals like window, document
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint recommended rules
      ...reactHooks.configs.recommended.rules, // React Hooks rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Allow unused vars starting with uppercase or underscore
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // React Refresh rule for Vite
    },
  },
];
