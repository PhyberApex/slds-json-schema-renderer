/**
 * Main entry point for the JSON Schema Documentation Generator
 */

const schemaParser = require('./utils/schema-parser');
const htmlGenerator = require('./utils/html-generator');
const cli = require('./cli');

module.exports = {
    schemaParser,
    htmlGenerator,
    cli
};