import path from 'node:path'
import $RefParser from '@apidevtools/json-schema-ref-parser'
import Ajv from 'ajv'
import fs from 'fs-extra'
import { glob } from 'glob'

// Initialize AJV with options
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
})

/**
 * Parse a JSON schema file
 * @param {string} filePath - Path to the JSON schema file
 * @returns {object} Parsed schema
 */
async function parse(filePath) {
  const absoluteFilePath = path.resolve(filePath)

  let schemaContent
  try {
    schemaContent = await fs.readFile(absoluteFilePath, 'utf8')
  }
  catch (err) {
    throw new Error(`Failed to read schema ${absoluteFilePath}: ${err.message}`)
  }

  let rawSchema
  try {
    rawSchema = JSON.parse(schemaContent)
  }
  catch (err) {
    throw new Error(`Invalid JSON in file ${absoluteFilePath}: ${err.message}`)
  }

  if (!rawSchema.$schema && !rawSchema.type) {
    console.warn(
      `Warning: File ${absoluteFilePath} may not be a JSON schema (missing $schema or type property)`,
    )
  }

  // Attempt to validate against JSON Schema draft-07
  try {
    const validate = ajv.compile({
      $schema: 'http://json-schema.org/draft-07/schema#',
    })

    validate(rawSchema)

    if (validate.errors) {
      console.warn(`Warning: Schema validation issues in ${absoluteFilePath}:`)
      validate.errors.forEach((err) => {
        console.warn(`  - ${err.instancePath} ${err.message}`)
      })
    }
  }
  catch (err) {
    console.warn(`Warning: Failed to validate schema ${absoluteFilePath}: ${err.message}`)
  }

  return processSchema(rawSchema, absoluteFilePath)
}

/**
 * Process a schema to resolve references and add metadata
 * @param {object} schema - The JSON schema object
 * @param {string} filePath - Absolute path to the JSON schema file; relative $refs resolve against its directory
 * @returns {object} Processed schema
 */
async function processSchema(schema, filePath) {
  const absoluteFilePath = path.resolve(filePath)
  const fileDir = path.dirname(absoluteFilePath)

  let dereferencedSchema
  try {
    dereferencedSchema = await $RefParser.dereference(absoluteFilePath, schema, {
      resolve: {
        http: false,
      },
    })
  }
  catch (err) {
    throw new Error(`Failed to resolve $ref in ${absoluteFilePath}: ${err.message}`)
  }

  const stats = await fs.stat(absoluteFilePath)

  dereferencedSchema._metadata = {
    fileName: path.basename(absoluteFilePath),
    filePath: absoluteFilePath,
    fileDirectory: fileDir,
    fileSize: stats.size,
    lastModified: stats.mtime,
    processed: new Date().toISOString(),
  }

  if (dereferencedSchema.title) {
    dereferencedSchema._metadata.title = dereferencedSchema.title
  }

  if (dereferencedSchema.$id) {
    dereferencedSchema._metadata.id = dereferencedSchema.$id
  }

  if (dereferencedSchema.type) {
    dereferencedSchema._metadata.types = Array.isArray(dereferencedSchema.type)
      ? dereferencedSchema.type
      : [dereferencedSchema.type]
  }

  if (dereferencedSchema.properties) {
    dereferencedSchema._metadata.propertyCount = Object.keys(dereferencedSchema.properties).length

    if (Array.isArray(dereferencedSchema.required)) {
      dereferencedSchema._metadata.requiredPropertyCount = dereferencedSchema.required.length
    }
  }

  return dereferencedSchema
}

/**
 * Parse all JSON schema files in a directory
 * @param {string} directoryPath - Path to the directory containing JSON schema files
 * @param {object} options - Options for parsing
 * @returns {Array} Array of parsed schemas
 */
async function parseDirectory(directoryPath, options = {}) {
  const { verbose = false } = options
  const schemas = []

  try {
    // Find all JSON files in the directory
    const files = await glob('**/*.json', {
      cwd: directoryPath,
      absolute: true,
    })

    if (verbose) {
      console.log(`Found ${files.length} JSON files in ${directoryPath}`)
    }

    // Parse each file
    for (const file of files) {
      try {
        const schema = await parse(file)
        schemas.push({
          schema,
          file,
        })
      }
      catch (err) {
        console.error(`Error parsing ${file}: ${err.message}`)
      }
    }

    return schemas
  }
  catch (err) {
    throw new Error(`Failed to parse directory: ${err.message}`)
  }
}

export { parse, parseDirectory, processSchema }
