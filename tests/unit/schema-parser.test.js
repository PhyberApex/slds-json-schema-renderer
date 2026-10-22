import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { parse, parseDirectory, validateSchema } from '../../src/utils/schema-parser.js'

let dir

async function writeJson(relativePath, data) {
  const file = path.join(dir, relativePath)
  await fs.outputJson(file, data)
  return file
}

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'slds-parser-'))
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(async () => {
  vi.restoreAllMocks()
  await fs.remove(dir)
})

describe('parse', () => {
  it('resolves relative $refs against the schema file location without changing the cwd', async () => {
    await writeJson('defs/address.json', { type: 'object', properties: { city: { type: 'string' } } })
    const file = await writeJson('nested/person.json', {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: { address: { $ref: '../defs/address.json' } },
    })
    const chdir = vi.spyOn(process, 'chdir')
    const cwdBefore = process.cwd()

    const schema = await parse(file)

    expect(schema.properties.address.properties.city).toEqual({ type: 'string' })
    expect(chdir).not.toHaveBeenCalled()
    expect(process.cwd()).toBe(cwdBefore)
  })

  it('attaches file metadata', async () => {
    const file = await writeJson('thing.json', { title: 'Thing', type: 'object', properties: { a: {}, b: {} }, required: ['a'] })

    const schema = await parse(file)

    expect(schema._metadata).toMatchObject({
      fileName: 'thing.json',
      filePath: file,
      title: 'Thing',
      types: ['object'],
      propertyCount: 2,
      requiredPropertyCount: 1,
    })
  })

  it('names the file and the unresolved reference in a single error message', async () => {
    const file = await writeJson('broken.json', { type: 'object', properties: { x: { $ref: './missing.json' } } })

    const error = await parse(file).catch(e => e)

    expect(error.message).toContain('broken.json')
    expect(error.message).toContain('missing.json')
    expect(error.message.match(/Failed to/g) ?? []).toHaveLength(1)
  })

  it('reports invalid JSON with the file name', async () => {
    const file = path.join(dir, 'bad.json')
    await fs.writeFile(file, '{ not json')

    await expect(parse(file)).rejects.toThrow(/Invalid JSON in file .*bad\.json/)
  })
})

describe('parseDirectory', () => {
  it('skips files that fail to parse unless strict', async () => {
    await writeJson('ok.json', { type: 'string' })
    await fs.writeFile(path.join(dir, 'bad.json'), '{ nope')

    const lenient = await parseDirectory(dir)
    expect(lenient.map(entry => path.basename(entry.file))).toEqual(['ok.json'])

    await expect(parseDirectory(dir, { strict: true })).rejects.toThrow(/bad\.json/)
  })

  it('returns one entry per JSON file with the resolved schema and its path', async () => {
    const a = await writeJson('a.json', { type: 'string' })
    const b = await writeJson('sub/b.json', { type: 'number' })

    const result = await parseDirectory(dir)

    expect(result.map(entry => entry.file).sort()).toEqual([a, b].sort())
    expect(result.find(entry => entry.file === b).schema.type).toBe('number')
  })
})

describe('validateSchema', () => {
  it('accepts a valid draft-07 schema', () => {
    expect(validateSchema({ type: 'object', properties: { name: { type: 'string' } } })).toEqual({ valid: true, errors: [] })
  })

  it('reports each metaschema violation with its path', () => {
    const result = validateSchema({ type: 'strng', required: 'name', properties: 'nope', minimum: 'abc' })

    expect(result.valid).toBe(false)
    expect([...new Set(result.errors.map(e => e.path))].sort()).toEqual(['/minimum', '/properties', '/required', '/type'].sort())
  })

  it('validates against the metaschema named by $schema', () => {
    const schema2020 = { $schema: 'https://json-schema.org/draft/2020-12/schema', type: 'array', prefixItems: 'x' }
    const schema07 = { $schema: 'http://json-schema.org/draft-07/schema#', type: 'array', prefixItems: 'x' }

    expect(validateSchema(schema2020).valid).toBe(false)
    expect(validateSchema(schema07).valid).toBe(true)
  })

  it('falls back to draft-07 for an unknown $schema', () => {
    expect(validateSchema({ $schema: 'https://example.com/custom', type: 'strng' }).valid).toBe(false)
  })
})

describe('parse validation', () => {
  it('prints no validation warning for a valid schema', async () => {
    const file = await writeJson('ok.json', { $schema: 'http://json-schema.org/draft-07/schema#', type: 'object' })

    await parse(file)

    expect(console.warn).not.toHaveBeenCalled()
  })

  it('warns with every violation for an invalid schema and still returns it', async () => {
    const file = await writeJson('invalid.json', { type: 'strng', minimum: 'abc' })

    const schema = await parse(file)

    expect(schema.type).toBe('strng')
    const output = console.warn.mock.calls.flat().join('\n')
    expect(output).toContain('invalid.json')
    expect(output).toContain('/type')
    expect(output).toContain('/minimum')
  })

  it('rejects an invalid schema in strict mode', async () => {
    const file = await writeJson('invalid.json', { type: 'strng' })

    await expect(parse(file, { strict: true })).rejects.toThrow(/invalid\.json.*\/type/s)
  })
})
