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
 * Escape a value for use as HTML text or inside a double-quoted attribute
 * @param {string} value - Raw text
 * @returns {string} Escaped text
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Replace a `{{placeholder}}` in the template with a verbatim value
 * @param {string} html - Template HTML
 * @param {string} name - Placeholder name without braces
 * @param {string} value - Replacement text
 * @returns {string} HTML with the placeholder replaced
 */
function fillPlaceholder(html, name, value) {
  return html.replace(`{{${name}}}`, () => value)
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
  const {
    schemas,
    outputDir,
    title = 'JSON Schema Documentation',
    description = '',
    bundleDir = DEFAULT_BUNDLE_DIR,
  } = options

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

    html = fillPlaceholder(html, 'title', escapeHtml(title))
    html = fillPlaceholder(
      html,
      'metaDescription',
      description ? `<meta name="description" content="${escapeHtml(description)}" />` : '',
    )

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

const BUNDLE_FILES = ['bundle.css', 'bundle.js']

/**
 * Copy the built frontend bundle into the output directory
 * @param {string} outputDir - Output directory
 * @param {string} bundleDir - Directory containing the built frontend bundle
 */
async function copyAssets(outputDir, bundleDir = DEFAULT_BUNDLE_DIR) {
  console.log('Copying assets...')

  if (!(await fs.pathExists(bundleDir))) {
    throw new Error(
      `Frontend bundle not found at ${bundleDir}. The package is incomplete; reinstall it or run "npm run build:frontend" when working from source.`,
    )
  }

  const missing = []
  for (const file of BUNDLE_FILES) {
    if (!(await fs.pathExists(path.join(bundleDir, file)))) {
      missing.push(file)
    }
  }
  if (missing.length > 0) {
    throw new Error(`Frontend bundle at ${bundleDir} is missing ${missing.join(', ')}`)
  }

  const assetsDir = path.join(outputDir, 'assets')
  await fs.ensureDir(assetsDir)
  await fs.copy(bundleDir, assetsDir)
  console.log('Frontend bundle copied successfully')
}

export { copyAssets, generate, serializeForInlineScript }
