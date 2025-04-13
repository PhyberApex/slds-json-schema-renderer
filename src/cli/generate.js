const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const schemaParser = require('../utils/schema-parser');
const htmlGenerator = require('../utils/html-generator');

/**
 * Generate documentation from JSON schema files
 * @param {Object} options - Command options
 */
async function generate(options) {
  const { input, output, title, description, verbose } = options;

  try {
    // Create output directory if it doesn't exist
    await fs.ensureDir(output);

    console.log(chalk.blue(`🔍 Looking for JSON schema files in: ${input}`));

    // Parse schema files from the input directory
    const schemas = await schemaParser.parseDirectory(input, { verbose });

    if (schemas.length === 0) {
      console.log(chalk.yellow(`⚠️ No valid JSON schema files found in ${input}`));
      return;
    }

    console.log(chalk.green(`✅ Found and parsed ${schemas.length} JSON schema files`));

    // Schema statistics
    if (verbose) {
      const typeStats = {};
      let totalProperties = 0;

      schemas.forEach(schema => {
        const type = schema.schema.type || 'unknown';
        typeStats[type] = (typeStats[type] || 0) + 1;

        if (schema.schema.properties) {
          totalProperties += Object.keys(schema.schema.properties).length;
        }
      });

      console.log(chalk.blue(`📊 Schema Statistics:`));
      console.log(`  - Total schemas: ${schemas.length}`);
      console.log(`  - Total properties: ${totalProperties}`);
      console.log(
        `  - Schema types: ${Object.entries(typeStats)
          .map(([type, count]) => `${type} (${count})`)
          .join(', ')}`
      );
    }

    console.log(chalk.blue(`🔨 Generating HTML documentation...`));

    // Generate the HTML documentation
    const result = await htmlGenerator.generate({
      schemas,
      outputDir: output,
      title,
      description,
    });

    console.log(chalk.green(`✅ Documentation generated successfully`));
    console.log(`📘 ${result.schemasProcessed} schemas documented`);
    console.log(`📁 Output: ${path.resolve(output)}`);
    console.log(`🌐 Open ${path.resolve(path.join(output, 'index.html'))} in your browser to view`);
  } catch (err) {
    console.error(chalk.red(`❌ Error generating documentation: ${err.message}`));
    if (verbose) {
      console.error(err);
    }
    process.exit(1);
  }
}

module.exports = generate;
