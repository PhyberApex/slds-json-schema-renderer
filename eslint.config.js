import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Read .gitignore patterns
const gitignorePath = resolve(__dirname, '.gitignore');
const gitignorePatterns = readFileSync(gitignorePath, 'utf8')
  .split('\n')
  .filter(line => line && !line.startsWith('#'))
  .map(pattern => pattern.trim());

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'lib/**',
      ...gitignorePatterns,
    ],
  },
  js.configs.recommended,
  // Vue configuration
  {
    files: ['**/*.vue'],
    ...vue.configs['vue3-recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vue.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prettier/prettier': 'error',
    },
  },
  // JavaScript/Node.js configuration
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        node: true,
        browser: true,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prettier/prettier': 'error',
    },
  },
]; 