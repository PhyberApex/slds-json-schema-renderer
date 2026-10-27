import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// Get directory path in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// This configuration works for both development and production
export default defineConfig(({ command }) => {
  const config = {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    plugins: [
      vue(),
      command === 'build'
        ? ''
        : vueDevTools(),
    ],

    // The root is src/frontend for development
    root: path.resolve(__dirname, 'src/frontend'),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/frontend'),
        '@slds': path.resolve(__dirname, 'node_modules/@salesforce-ux/design-system/assets'),
      },
    },
  }

  if (command === 'build') {
    // Production build settings
    config.build = {
      // Output directory is lib/frontend
      outDir: path.resolve(__dirname, 'lib/frontend'),
      emptyOutDir: true,
      assetsInlineLimit: 0,
      // lightningcss (Vite 8 default) rejects the `:nth-child(1 of .sel)` syntax used by SLDS
      cssMinify: 'esbuild',

      // The bundle is only ever loaded through a <script> tag, so a single
      // IIFE with a plain .js extension keeps every static host serving it
      // as JavaScript (a .cjs file is served as application/node and is
      // refused under X-Content-Type-Options: nosniff).
      lib: {
        entry: path.resolve(__dirname, 'src/frontend/index.js'),
        name: 'JsonSchemaDocs',
        fileName: () => 'bundle.js',
        cssFileName: 'bundle',
        formats: ['iife'],
      },
    }
  }
  else {
    // Development server settings
    config.server = {
      // Serve node_modules for SLDS resources
      fs: {
        allow: ['..', '../../node_modules'],
      },
    }
  }

  return config
})
