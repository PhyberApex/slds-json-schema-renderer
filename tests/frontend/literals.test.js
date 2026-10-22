import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ConstSchema from '@/components/schema/ConstSchema.vue'
import EnumSchema from '@/components/schema/EnumSchema.vue'
import LiteralValue from '@/components/schema/LiteralValue.vue'
import { formatLiteral } from '@/utils/formatLiteral.js'

describe('formatLiteral', () => {
  it.each([
    [null, 'null'],
    ['', '""'],
    ['text', '"text"'],
    ['1', '"1"'],
    [1, '1'],
    [false, 'false'],
    [true, 'true'],
    [[1, 'a'], '[\n  1,\n  "a"\n]'],
    [{ a: null }, '{\n  "a": null\n}'],
  ])('formats %j as %s', (value, expected) => {
    expect(formatLiteral(value)).toBe(expected)
  })
})

describe('enumSchema', () => {
  it('renders every value including null and the empty string', () => {
    const wrapper = mount(EnumSchema, { props: { schema: { enum: [null, '', false, 'x', 1] } } })
    expect(wrapper.findAll('.slds-badge').map(badge => badge.text())).toEqual(['null', '""', 'false', '"x"', '1'])
  })

  it('pretty-prints object values', () => {
    const wrapper = mount(EnumSchema, { props: { schema: { enum: [{ a: 1 }] } } })
    expect(wrapper.find('pre').text()).toBe('{\n  "a": 1\n}')
  })
})

describe('constSchema', () => {
  it.each([
    [null, 'null'],
    ['', '""'],
    [0, '0'],
  ])('renders const %j as %s', (value, expected) => {
    const wrapper = mount(ConstSchema, { props: { schema: { const: value } } })
    expect(wrapper.find('.slds-badge').text()).toBe(expected)
  })

  it('pretty-prints an object const', () => {
    const wrapper = mount(ConstSchema, { props: { schema: { const: { a: 1 } } } })
    expect(wrapper.find('pre').text()).toBe('{\n  "a": 1\n}')
  })
})

describe('literalValue', () => {
  it('renders scalars as a badge and composites as a code block', () => {
    expect(mount(LiteralValue, { props: { value: 'x' } }).find('.slds-badge').text()).toBe('"x"')
    expect(mount(LiteralValue, { props: { value: [1] } }).find('pre').text()).toBe('[\n  1\n]')
  })
})
