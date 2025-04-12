import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// This configuration works for both development and production
export default defineConfig(({ command }) => {
    const config = {
        plugins: [vue()],

        // The root is src/frontend for development
        root: path.resolve(__dirname, 'src/frontend'),

        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/frontend'),
                '@slds': path.resolve(__dirname, 'node_modules/@salesforce-ux/design-system/assets')
            }
        }
    };

    if (command === 'build') {
        // Production build settings
        config.build = {
            // Output directory is lib/frontend
            outDir: path.resolve(__dirname, 'lib/frontend'),
            emptyOutDir: true,
            assetsInlineLimit: 0,

            // Generate a library build
            lib: {
                // Entry point is in src/frontend
                entry: path.resolve(__dirname, 'src/frontend/index.js'),
                name: 'JsonSchemaDocs',
                fileName: 'bundle',
                formats: ['es', 'umd']
            },
            rollupOptions: {
                // This ensures we don't bundle Vue into our output file
                external: ['vue'],
                output: {
                    // Global variables to use in UMD build for externalized deps
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        };
    } else {
        // Development server settings
        config.server = {
            // Serve node_modules for SLDS resources
            fs: {
                allow: ['..', '../../node_modules']
            }
        };
    }

    return config;
});
