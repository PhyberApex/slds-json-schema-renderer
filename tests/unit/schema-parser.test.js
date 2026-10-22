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

describe('parse circular references', () => {
  it('replaces back-edges with a circular $ref marker so the result is serializable', async () => {
    const file = await writeJson('tree.json', {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Tree',
      type: 'object',
      properties: {
        name: { type: 'string' },
        children: { type: 'array', items: { $ref: '#' } },
      },
    })

    const schema = await parse(file)

    expect(() => JSON.stringify(schema)).not.toThrow()
    expect(schema.properties.children.items).toEqual({ $ref: '#', _circular: true })
    expect(schema.properties.name).toEqual({ type: 'string' })
  })

  it('expands a reference to a cyclic definition once before marking the cycle', async () => {
    const file = await writeJson('linked.json', {
      type: 'object',
      definitions: {
        node: { type: 'object', properties: { next: { $ref: '#/definitions/node' } } },
      },
      properties: { head: { $ref: '#/definitions/node' } },
    })

    const schema = await parse(file)

    expect(schema.properties.head.type).toBe('object')
    expect(schema.properties.head.properties.next).toEqual({ $ref: '#/properties/head', _circular: true })
    expect(() => JSON.stringify(schema)).not.toThrow()
  })

  it('keeps shared non-cyclic references fully expanded', async () => {
    const file = await writeJson('shared.json', {
      type: 'object',
      definitions: { id: { type: 'string', minLength: 1 } },
      properties: { a: { $ref: '#/definitions/id' }, b: { $ref: '#/definitions/id' } },
    })

    const schema = await parse(file)

    expect(schema.properties.a).toEqual({ type: 'string', minLength: 1 })
    expect(schema.properties.b).toEqual({ type: 'string', minLength: 1 })
  })
})

describe('parse non-object documents', () => {
  it.each([
    ['null', null],
    ['a number', 42],
    ['a string', 'text'],
    ['an array', [1, 2]],
  ])('rejects %s as not a JSON Schema document', async (_label, content) => {
    const file = await writeJson('doc.json', content)

    await expect(parse(file)).rejects.toThrow(/doc\.json is not a JSON Schema document/)
  })

  it('rejects a top-level boolean schema with a dedicated message', async () => {
    const file = await writeJson('bool.json', true)

    await expect(parse(file)).rejects.toThrow(/boolean/i)
  })

  it('accepts an object without $schema or type but says it is still included', async () => {
    const file = await writeJson('package.json', { name: 'pkg', version: '1.0.0' })

    const schema = await parse(file)

    expect(schema._metadata.fileName).toBe('package.json')
    const output = console.warn.mock.calls.flat().join('\n')
    expect(output).toMatch(/package\.json.*(still|treated as).*schema/is)
  })
})

describe('parseDirectory', () => {
  it('ignores JSON files under node_modules', async () => {
    await writeJson('ok.json', { type: 'string' })
    await writeJson('node_modules/dep/package.json', { name: 'dep' })

    const result = await parseDirectory(dir)

    expect(result.map(entry => path.basename(entry.file))).toEqual(['ok.json'])
  })

  it('skips non-object documents and keeps the real schemas', async () => {
    await writeJson('ok.json', { type: 'string' })
    await writeJson('list.json', [1, 2])
    await writeJson('nothing.json', null)

    const result = await parseDirectory(dir)

    expect(result.map(entry => path.basename(entry.file))).toEqual(['ok.json'])
    expect(console.error).toHaveBeenCalledTimes(2)
  })

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
