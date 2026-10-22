import { execFile } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import fs from 'fs-extra'
import { JSDOM, VirtualConsole } from 'jsdom'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const cli = path.join(repoRoot, 'bin/cli.js')
const fixtures = path.join(repoRoot, 'test')

let outputDir

async function loadGeneratedPage() {
  const errors = []
  const virtualConsole = new VirtualConsole()
  virtualConsole.on('jsdomError', err => errors.push(err))
  virtualConsole.on('error', (...args) => errors.push(args.join(' ')))

  const html = await fs.readFile(path.join(outputDir, 'index.html'), 'utf8')
  const dom = new JSDOM(html, {
    url: pathToFileURL(path.join(outputDir, 'index.html')).href,
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole,
  })
  dom.window.addEventListener('error', event => errors.push(event.error ?? event.message))

  await new Promise(resolve => dom.window.addEventListener('load', resolve))
  await new Promise(resolve => setTimeout(resolve, 50))

  return { dom, errors }
}

beforeAll(async () => {
  outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'slds-smoke-'))
  await promisify(execFile)(process.execPath, [cli, 'generate', '-i', fixtures, '-o', outputDir], { cwd: repoRoot })
}, 60_000)

afterAll(() => fs.remove(outputDir))

describe('built frontend bundle', () => {
  it('contains no bare process references', async () => {
    const bundle = await fs.readFile(path.join(outputDir, 'assets/bundle.js'), 'utf8')
    expect(bundle).not.toMatch(/\bprocess\./)
  })

  it('mounts the app and lists one sidebar entry per schema without errors', async () => {
    const { dom, errors } = await loadGeneratedPage()
    const schemaCount = dom.window.__JSON_SCHEMA_DOCS_DATA__.schemas.length

    expect(errors).toEqual([])
    expect(schemaCount).toBeGreaterThan(0)
    expect(dom.window.document.querySelectorAll('#app button').length).toBe(schemaCount)
    expect(dom.window.document.querySelectorAll('#app button.slds-is-active').length).toBe(1)
  })
})
