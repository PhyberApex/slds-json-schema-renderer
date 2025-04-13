import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate HTML documentation from parsed JSON schemas
 * @param {Object} options - Generation options
 * @param {Array} options.schemas - Array of parsed schemas
 * @param {string} options.outputDir - Output directory
 * @param {string} options.title - Documentation title
 * @param {string} options.description - Documentation description
 */
async function generate(options) {
  const { schemas, outputDir, title, description } = options;

  try {
    console.log('Preparing output directory...');
    // Create the output directory if it doesn't exist
    await fs.ensureDir(outputDir);

    // Read the HTML template
    const templatePath = path.join(__dirname, '../templates/index.html');
    let html = await fs.readFile(templatePath, 'utf8');

    // Prepare the data for the Vue components
    const appData = {
      title,
      description,
      schemas,
      generatedAt: new Date().toISOString(),
    };

    console.log('Creating HTML output...');

    // Add the data to the window object so it can be used by Vue
    const scriptTag = `<script>
      window.__JSON_SCHEMA_DOCS_DATA__ = ${JSON.stringify(appData)};
    </script>`;

    // Insert the script tag before the closing body tag
    html = html.replace('</body>', `${scriptTag}</body>`);

    console.log('Writing HTML file...');
    // Write the HTML to the output directory
    const outputPath = path.join(outputDir, 'index.html');
    await fs.writeFile(outputPath, html);

    // Copy assets and bundle
    await copyAssets(outputDir);

    return {
      outputPath,
      schemasProcessed: schemas.length,
    };
  } catch (err) {
    throw new Error(`Failed to generate HTML: ${err.message}`);
  }
}

/**
 * Copy assets to the output directory
 * @param {string} outputDir - Output directory
 */
async function copyAssets(outputDir) {
  try {
    console.log('Copying assets...');
    // Create assets directory
    const assetsDir = path.join(outputDir, 'assets');
    await fs.ensureDir(assetsDir);

    // Copy the frontend bundle from the lib directory
    try {
      // Vite produces both ES modules and UMD files - we'll use the UMD version for broader compatibility
      const bundlePath = path.resolve(__dirname, '../../lib/frontend/');
      const bundleTarget = assetsDir;

      if (await fs.pathExists(bundlePath)) {
        await fs.copy(bundlePath, bundleTarget);
        console.log('Frontend bundle copied successfully');

        // Copy Vue as well since we're externalizing it
        const vuePath = path.resolve(__dirname, '../../node_modules/vue/dist/vue.global.prod.js');
        const vueTarget = path.join(assetsDir, 'vue.js');
        if (await fs.pathExists(vuePath)) {
          await fs.copy(vuePath, vueTarget);
          console.log('Vue bundle copied successfully');
        } else {
          console.warn('Warning: Vue not found at', vuePath);
        }
      } else {
        console.warn('Warning: Frontend bundle not found at', bundlePath);
        console.warn('Make sure you run "npm run build:frontend" first');
        // Create a placeholder bundle
        await fs.writeFile(bundleTarget, '// Placeholder bundle');
      }
    } catch (err) {
      console.warn(`Warning: Could not copy frontend bundle: ${err.message}`);
    }
  } catch (err) {
    throw new Error(`Failed to copy assets: ${err.message}`);
  }
}

export { generate, copyAssets };
