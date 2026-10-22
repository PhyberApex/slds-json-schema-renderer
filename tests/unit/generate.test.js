import os from 'node:os'
import path from 'node:path'
import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { generate } from '../../src/utils/html-generator.js'

let tmpDir
let bundleDir

async function readEmbeddedData(outputDir) {
  const html = await fs.readFile(path.join(outputDir, 'index.html'), 'utf8')
  const match = html.match(/window\.__JSON_SCHEMA_DOCS_DATA__ = (.*?);\s*<\/script>/s)
  return match ? JSON.parse(match[1]) : null
}

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slds-generate-'))
  bundleDir = path.join(tmpDir, 'bundle')
  await fs.ensureDir(bundleDir)
  await fs.writeFile(path.join(bundleDir, 'bundle.css'), 'body{}')
  await fs.writeFile(path.join(bundleDir, 'bundle.umd.cjs'), '// bundle')
})

afterEach(() => fs.remove(tmpDir))

describe('generate', () => {
  it('embeds schema data containing $ replacement patterns verbatim', async () => {
    const schema = {
      title: 'Dollar',
      type: 'object',
      properties: {
        price: { type: 'string', description: 'Price in $\'000 and $` and $& and $$', pattern: '^\\$$' },
      },
    }
    const outputDir = path.join(tmpDir, 'out')

    await generate({
      schemas: [{ schema, file: '/schemas/dollar.json' }],
      outputDir,
      bundleDir,
      title: 'Docs',
      description: '',
    })

    const data = await readEmbeddedData(outputDir)
    expect(data.schemas[0].schema).toEqual(schema)
  })
})
