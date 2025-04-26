import path from 'node:path'
import process from 'node:process'
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
  try {
    // Get absolute path
    const absoluteFilePath = path.resolve(filePath)

    // Get the directory of the file
    const fileDir = path.dirname(absoluteFilePath)

    // Read the schema file
    const schemaContent = await fs.readFile(absoluteFilePath, 'utf8')
    let rawSchema

    try {
      rawSchema = JSON.parse(schemaContent)
    }
    catch (error) {
      throw new Error(`Invalid JSON in file ${absoluteFilePath}: ${error.message}`)
    }

    // Check if it's a valid JSON schema (should have a $schema property or type property)
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

    // Process the schema to normalize and add metadata - passing the file directory
    return await processSchema(rawSchema, absoluteFilePath, fileDir)
  }
  catch (err) {
    throw new Error(`Failed to parse schema: ${err.message}`)
  }
}

/**
 * Process a schema to resolve references and add metadata
 * @param {object} schema - The JSON schema object
 * @param {string} filePath - Path to the JSON schema file
 * @param {string} fileDir - Directory of the JSON schema file
 * @returns {object} Processed schema
 */
async function processSchema(schema, filePath, fileDir) {
  try {
    // Store the current working directory
    const originalCwd = process.cwd()

    try {
      // Change working directory to the file's directory
      process.chdir(fileDir)

      // Dereference any $ref pointers - now relative to the file's directory
      const dereferencedSchema = await $RefParser.dereference(schema, {
        resolve: {
          http: false,
        },
      })

      // Get file stats
      const stats = await fs.stat(filePath)

      // Add metadata
      dereferencedSchema._metadata = {
        fileName: path.basename(filePath),
        filePath,
        fileDirectory: fileDir,
        fileSize: stats.size,
        lastModified: stats.mtime,
        processed: new Date().toISOString(),
      }

      // Extract additional useful metadata from the schema
      if (dereferencedSchema.title) {
        dereferencedSchema._metadata.title = dereferencedSchema.title
      }

      if (dereferencedSchema.$id) {
        dereferencedSchema._metadata.id = dereferencedSchema.$id
      }

      // Extract all schema types (if it's an array of types)
      if (dereferencedSchema.type) {
        if (Array.isArray(dereferencedSchema.type)) {
          dereferencedSchema._metadata.types = dereferencedSchema.type
        }
        else {
          dereferencedSchema._metadata.types = [dereferencedSchema.type]
        }
      }

      // Count properties
      if (dereferencedSchema.properties) {
        dereferencedSchema._metadata.propertyCount = Object.keys(
          dereferencedSchema.properties,
        ).length

        // Count required properties
        if (Array.isArray(dereferencedSchema.required)) {
          dereferencedSchema._metadata.requiredPropertyCount = dereferencedSchema.required.length
        }
      }

      return dereferencedSchema
    }
    finally {
      // Restore the original working directory
      process.chdir(originalCwd)
    }
  }
  catch (err) {
    throw new Error(`Failed to process schema: ${err.message}`)
  }
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
