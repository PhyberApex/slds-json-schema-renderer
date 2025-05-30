#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import process from 'node:process'
import { program } from 'commander'
import * as cli from '../lib/cli/index.js'

// Read package.json
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))

program.version(pkg.version).description('JSON Schema Documentation Generator CLI')

// Add the generate command
program
  .command('generate')
  .description('Generate documentation from JSON schema files')
  .option('-i, --input <directory>', 'Input directory containing JSON schema files', './schemas')
  .option('-o, --output <directory>', 'Output directory for the generated documentation', './docs')
  .option('-t, --title <title>', 'Documentation title', 'JSON Schema Documentation')
  .option('-d, --description <description>', 'Documentation description', '')
  .option('-v, --verbose', 'Enable verbose output', false)
  .action(cli.generate)

program.parse(process.argv)

// If no arguments, display help
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
