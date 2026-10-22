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

  it('copies the bundle files into assets/', async () => {
    const outputDir = path.join(tmpDir, 'out')
    await generate({ schemas: [], outputDir, bundleDir, title: 'Docs', description: '' })

    expect(await fs.pathExists(path.join(outputDir, 'assets/bundle.css'))).toBe(true)
    expect(await fs.pathExists(path.join(outputDir, 'assets/bundle.umd.cjs'))).toBe(true)
  })

  it('rejects when the frontend bundle directory is missing', async () => {
    const outputDir = path.join(tmpDir, 'out')
    const missing = path.join(tmpDir, 'does-not-exist')

    await expect(generate({ schemas: [], outputDir, bundleDir: missing, title: 'Docs', description: '' }))
      .rejects
      .toThrow(/frontend bundle/i)
  })

  it('rejects when the bundle directory lacks one of the referenced asset files', async () => {
    const outputDir = path.join(tmpDir, 'out')
    await fs.remove(path.join(bundleDir, 'bundle.css'))

    await expect(generate({ schemas: [], outputDir, bundleDir, title: 'Docs', description: '' }))
      .rejects
      .toThrow(/bundle\.css/)
  })

  it('writes the configured title and description into the document head, HTML-escaped', async () => {
    const outputDir = path.join(tmpDir, 'out')
    await generate({
      schemas: [],
      outputDir,
      bundleDir,
      title: 'Tom & Jerry <Docs>',
      description: 'Quotes "here" & there',
    })

    const html = await fs.readFile(path.join(outputDir, 'index.html'), 'utf8')
    expect(html).toContain('<title>Tom &amp; Jerry &lt;Docs&gt;</title>')
    expect(html).toContain('<meta name="description" content="Quotes &quot;here&quot; &amp; there" />')
  })

  it('omits the meta description when none is configured', async () => {
    const outputDir = path.join(tmpDir, 'out')
    await generate({ schemas: [], outputDir, bundleDir, title: 'Docs', description: '' })

    const html = await fs.readFile(path.join(outputDir, 'index.html'), 'utf8')
    expect(html).not.toContain('name="description"')
  })
})
