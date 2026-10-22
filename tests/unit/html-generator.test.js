import { describe, expect, it } from 'vitest'
import { serializeForInlineScript } from '../../src/utils/html-generator.js'

describe('serializeForInlineScript', () => {
  it('round-trips data through JSON.parse', () => {
    const data = { title: 'Hello & <world>', nested: { arr: [1, 'two', null, true] } }
    expect(JSON.parse(serializeForInlineScript(data))).toEqual(data)
  })

  it('never emits a closing script tag or raw angle brackets', () => {
    const output = serializeForInlineScript({ description: '</script><script>alert(1)</script>' })
    expect(output).not.toMatch(/[<>&]/)
  })

  it('escapes the U+2028 and U+2029 line separators', () => {
    const text = `a${String.fromCharCode(0x2028)}b${String.fromCharCode(0x2029)}c`
    const output = serializeForInlineScript({ text })
    expect(output).not.toMatch(/[\u2028\u2029]/)
    expect(JSON.parse(output).text).toBe(text)
  })
})
