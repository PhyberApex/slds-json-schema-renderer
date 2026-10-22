import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { parse, parseDirectory } from '../../src/utils/schema-parser.js'

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
  it('returns one entry per JSON file with the resolved schema and its path', async () => {
    const a = await writeJson('a.json', { type: 'string' })
    const b = await writeJson('sub/b.json', { type: 'number' })

    const result = await parseDirectory(dir)

    expect(result.map(entry => entry.file).sort()).toEqual([a, b].sort())
    expect(result.find(entry => entry.file === b).schema.type).toBe('number')
  })
})
