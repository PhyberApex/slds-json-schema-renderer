import path from 'node:path'
import $RefParser from '@apidevtools/json-schema-ref-parser'
import Ajv from 'ajv'
import Ajv2019 from 'ajv/dist/2019.js'
import Ajv2020 from 'ajv/dist/2020.js'
import draft06 from 'ajv/dist/refs/json-schema-draft-06.json' with { type: 'json' }
import fs from 'fs-extra'
import { glob } from 'glob'

const ajvOptions = { allErrors: true, strict: false }

const DRAFT_07 = 'http://json-schema.org/draft-07/schema'
const DRAFT_06 = 'http://json-schema.org/draft-06/schema'
const DRAFT_2019 = 'https://json-schema.org/draft/2019-09/schema'
const DRAFT_2020 = 'https://json-schema.org/draft/2020-12/schema'

const metaschemaValidators = {
  [DRAFT_07]: () => new Ajv(ajvOptions).getSchema(`${DRAFT_07}#`),
  [DRAFT_06]: () => new Ajv(ajvOptions).addMetaSchema(draft06).getSchema(`${DRAFT_06}#`),
  [DRAFT_2019]: () => new Ajv2019(ajvOptions).getSchema(DRAFT_2019),
  [DRAFT_2020]: () => new Ajv2020(ajvOptions).getSchema(DRAFT_2020),
}

const validatorCache = new Map()

function metaschemaValidatorFor(schema) {
  const declared = typeof schema.$schema === 'string' ? schema.$schema.replace(/#$/, '') : ''
  const uri = declared in metaschemaValidators ? declared : DRAFT_07
  if (!validatorCache.has(uri)) {
    validatorCache.set(uri, metaschemaValidators[uri]())
  }
  return validatorCache.get(uri)
}

/**
 * Validate a schema document against the metaschema it declares in `$schema`
 * (draft-06, draft-07, 2019-09 or 2020-12), falling back to draft-07.
 * @param {object} schema - The raw schema document
 * @returns {{ valid: boolean, errors: Array<{ path: string, message: string }> }} Validation result
 */
function validateSchema(schema) {
  const validate = metaschemaValidatorFor(schema)
  const valid = validate(schema)
  const errors = (validate.errors ?? []).map(err => ({
    path: err.instancePath || '/',
    message: err.message,
  }))
  return { valid, errors }
}

function describeJson(value) {
  if (value === null)
    return 'null'
  return Array.isArray(value) ? 'an array' : `a ${typeof value}`
}

/**
 * Parse a JSON schema file
 * @param {string} filePath - Path to the JSON schema file
 * @param {object} [options] - Parsing options
 * @param {boolean} [options.strict] - Reject schemas that violate their metaschema instead of warning
 * @returns {object} Parsed schema
 */
async function parse(filePath, options = {}) {
  const { strict = false } = options
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

  if (typeof rawSchema === 'boolean') {
    throw new TypeError(
      `${absoluteFilePath} is a top-level boolean schema (${rawSchema}); boolean schemas are only supported as subschemas`,
    )
  }

  if (rawSchema === null || typeof rawSchema !== 'object' || Array.isArray(rawSchema)) {
    throw new Error(`${absoluteFilePath} is not a JSON Schema document (expected an object, got ${describeJson(rawSchema)})`)
  }

  if (!rawSchema.$schema && !rawSchema.type) {
    console.warn(
      `Warning: ${absoluteFilePath} has neither $schema nor type; it is still treated as a schema and included in the output`,
    )
  }

  const validation = validateSchema(rawSchema)
  if (!validation.valid) {
    const details = validation.errors.map(err => `  - ${err.path} ${err.message}`).join('\n')
    if (strict) {
      throw new Error(`Schema ${absoluteFilePath} does not match its metaschema:\n${details}`)
    }
    console.warn(`Warning: Schema validation issues in ${absoluteFilePath}:\n${details}`)
  }

  return processSchema(rawSchema, absoluteFilePath)
}

function escapePointerSegment(segment) {
  return String(segment).replace(/~/g, '~0').replace(/\//g, '~1')
}

/**
 * Copy a dereferenced schema graph, replacing every edge that points back to
 * an ancestor with a `{ $ref, _circular: true }` marker so the result is a
 * tree that `JSON.stringify` can serialize. Shared references that do not form
 * a cycle are copied in full.
 * @param {unknown} node - Current value
 * @param {Map<object, string>} ancestors - Objects on the current path, mapped to their JSON pointer
 * @param {string} pointer - JSON pointer of the current value
 * @returns {unknown} Acyclic copy
 */
function breakCycles(node, ancestors = new Map(), pointer = '#') {
  if (node === null || typeof node !== 'object') {
    return node
  }
  if (ancestors.has(node)) {
    return { $ref: ancestors.get(node), _circular: true }
  }

  ancestors.set(node, pointer)
  const copy = Array.isArray(node)
    ? node.map((item, index) => breakCycles(item, ancestors, `${pointer}/${index}`))
    : Object.fromEntries(
        Object.entries(node).map(([key, value]) => [
          key,
          breakCycles(value, ancestors, `${pointer}/${escapePointerSegment(key)}`),
        ]),
      )
  ancestors.delete(node)

  return copy
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
    const graph = await $RefParser.dereference(absoluteFilePath, schema, {
      resolve: {
        http: false,
      },
    })
    dereferencedSchema = breakCycles(graph)
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
  const { verbose = false, strict = false } = options
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
        const schema = await parse(file, { strict })
        schemas.push({
          schema,
          file,
        })
      }
      catch (err) {
        if (strict) {
          throw err
        }
        console.error(`Error parsing ${file}: ${err.message}`)
      }
    }

    return schemas
  }
  catch (err) {
    throw new Error(`Failed to parse directory: ${err.message}`)
  }
}

export { parse, parseDirectory, processSchema, validateSchema }
