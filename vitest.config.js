import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const alias = {
  '@': path.resolve(__dirname, 'src/frontend'),
  '@slds': path.resolve(__dirname, 'node_modules/@salesforce-ux/design-system/assets'),
}

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.test.js'],
          environment: 'node',
        },
      },
      {
        plugins: [vue()],
        resolve: { alias },
        test: {
          name: 'frontend',
          include: ['tests/frontend/**/*.test.js'],
          environment: 'jsdom',
        },
      },
      {
        test: {
          name: 'smoke',
          include: ['tests/smoke/**/*.test.js'],
          environment: 'node',
        },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,vue}'],
      reporter: ['text', 'lcov'],
      thresholds: { lines: 15, functions: 5, branches: 5, statements: 15 },
    },
  },
})
