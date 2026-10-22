import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DEFAULT_BUNDLE_DIR = path.resolve(__dirname, '../../lib/frontend/')

/**
 * Serialize data as JSON that is safe to embed inside an inline <script> tag.
 * Angle brackets and ampersands are escaped so a `</script>` inside a schema
 * cannot terminate the tag, and the line separators U+2028/U+2029 are escaped
 * because they are valid in JSON but not in JavaScript string literals.
 * @param {object} data - Data to serialize
 * @returns {string} Escaped JSON string
 */
function serializeForInlineScript(data) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/**
 * Generate HTML documentation from parsed JSON schemas
 * @param {object} options - Generation options
 * @param {Array} options.schemas - Array of parsed schemas
 * @param {string} options.outputDir - Output directory
 * @param {string} options.title - Documentation title
 * @param {string} options.description - Documentation description
 * @param {string} [options.bundleDir] - Directory containing the built frontend bundle
 */
async function generate(options) {
  const { schemas, outputDir, title, description, bundleDir = DEFAULT_BUNDLE_DIR } = options

  try {
    console.log('Preparing output directory...')
    // Create the output directory if it doesn't exist
    await fs.ensureDir(outputDir)

    // Read the HTML template
    const templatePath = path.join(__dirname, '../templates/index.html')
    let html = await fs.readFile(templatePath, 'utf8')

    // Prepare the data for the Vue components
    const appData = {
      title,
      description,
      schemas,
      generatedAt: new Date().toISOString(),
    }

    console.log('Creating HTML output...')

    // Add the data to the window object so it can be used by Vue
    const scriptTag = `<script>
      window.__JSON_SCHEMA_DOCS_DATA__ = ${serializeForInlineScript(appData)};
    </script>`

    // A replacer function inserts the data verbatim; a string replacement
    // would interpret `$$`, `$&`, `` $` `` and `$'` inside the schema data.
    html = html.replace('</body>', () => `${scriptTag}</body>`)

    console.log('Writing HTML file...')
    // Write the HTML to the output directory
    const outputPath = path.join(outputDir, 'index.html')
    await fs.writeFile(outputPath, html)

    // Copy assets and bundle
    await copyAssets(outputDir, bundleDir)

    return {
      outputPath,
      schemasProcessed: schemas.length,
    }
  }
  catch (err) {
    throw new Error(`Failed to generate HTML: ${err.message}`)
  }
}

/**
 * Copy assets to the output directory
 * @param {string} outputDir - Output directory
 * @param {string} bundleDir - Directory containing the built frontend bundle
 */
async function copyAssets(outputDir, bundleDir = DEFAULT_BUNDLE_DIR) {
  try {
    console.log('Copying assets...')
    // Create assets directory
    const assetsDir = path.join(outputDir, 'assets')
    await fs.ensureDir(assetsDir)

    // Copy the frontend bundle from the lib directory
    try {
      const bundlePath = bundleDir
      const bundleTarget = assetsDir

      if (await fs.pathExists(bundlePath)) {
        await fs.copy(bundlePath, bundleTarget)
        console.log('Frontend bundle copied successfully')
      }
      else {
        console.warn('Warning: Frontend bundle not found at', bundlePath)
        console.warn('Make sure you run "npm run build:frontend" first')
        // Create a placeholder bundle
        await fs.writeFile(bundleTarget, '// Placeholder bundle')
      }
    }
    catch (err) {
      console.warn(`Warning: Could not copy frontend bundle: ${err.message}`)
    }
  }
  catch (err) {
    throw new Error(`Failed to copy assets: ${err.message}`)
  }
}

export { copyAssets, generate, serializeForInlineScript }
