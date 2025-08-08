import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/build', '**/node_modules/*'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Disable no-explicit-any rule until defining the missing types
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
