import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { generate } from '../../src/cli/generate.js'

let dir
let bundleDir
let exit

function output(spy) {
  return spy.mock.calls.flat().join('\n')
}

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'slds-cli-'))
  bundleDir = path.join(dir, 'bundle')
  await fs.outputFile(path.join(bundleDir, 'bundle.css'), '')
  await fs.outputFile(path.join(bundleDir, 'bundle.js'), '')
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  exit = vi.spyOn(process, 'exit').mockImplementation(() => {})
})

afterEach(async () => {
  vi.restoreAllMocks()
  await fs.remove(dir)
})

function run(extra = {}) {
  return generate({
    input: path.join(dir, 'in'),
    output: path.join(dir, 'out'),
    title: 'Docs',
    description: '',
    verbose: false,
    strict: false,
    bundleDir,
    ...extra,
  })
}

describe('generate command exit behaviour', () => {
  it('exits with code 1 when no schema could be parsed', async () => {
    await fs.ensureDir(path.join(dir, 'in'))

    await run()

    expect(exit).toHaveBeenCalledWith(1)
    expect(output(console.error)).toMatch(/no valid json schema/i)
  })

  it('generates, summarises skipped files and exits 0 by default', async () => {
    await fs.outputJson(path.join(dir, 'in/ok.json'), { type: 'string' })
    await fs.outputFile(path.join(dir, 'in/bad.json'), '{ nope')

    await run()

    expect(exit).not.toHaveBeenCalled()
    expect(await fs.pathExists(path.join(dir, 'out/index.html'))).toBe(true)
    expect(output(console.warn)).toMatch(/1 file.*skipped/i)
    expect(output(console.warn)).toContain('bad.json')
  })

  it('exits with code 1 after generating when --fail-on-skip is set and a file was skipped', async () => {
    await fs.outputJson(path.join(dir, 'in/ok.json'), { type: 'string' })
    await fs.outputFile(path.join(dir, 'in/bad.json'), '{ nope')

    await run({ failOnSkip: true })

    expect(await fs.pathExists(path.join(dir, 'out/index.html'))).toBe(true)
    expect(exit).toHaveBeenCalledWith(1)
  })

  it('prints no skip summary when every file parsed', async () => {
    await fs.outputJson(path.join(dir, 'in/ok.json'), { type: 'string' })

    await run({ failOnSkip: true })

    expect(exit).not.toHaveBeenCalled()
    expect(output(console.warn)).not.toMatch(/skipped/i)
  })
})
