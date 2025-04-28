import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          impliedStrict: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': 1,
      'no-prototype-builtins': 0,
      'no-case-declarations': 0,
      'no-empty-pattern': 0,
      semi: 0,
      '@typescript-eslint/no-unused-vars': 2,
      '@typescript-eslint/await-thenable': 1,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      'unused-imports/no-unused-imports': 2,
    },
  },
  {
    ignores: ['**/dist/**'],
  },
]