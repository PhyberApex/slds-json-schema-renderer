import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import { formatType, normalizeTypes, schemaUtils } from '@/utils/schemaRegistry.js'

describe('normalizeTypes', () => {
  it.each([
    [{ type: 'string' }, ['string']],
    [{ type: ['string', 'null'] }, ['string', 'null']],
    [{}, []],
    [true, []],
  ])('returns an array of declared types for %j', (schema, expected) => {
    expect(normalizeTypes(schema)).toEqual(expected)
  })
})

describe('formatType', () => {
  it('joins multiple types with a separator', () => {
    expect(formatType({ type: ['string', 'null'] })).toBe('string | null')
    expect(formatType({ type: 'integer' })).toBe('integer')
  })
})

describe('type arrays', () => {
  it('renders a nullable string with PrimitiveSchema', () => {
    expect(schemaUtils.getComponentForSchema({ type: ['string', 'null'] })).toBe(PrimitiveSchema)
  })

  it('renders a nullable object with ObjectSchema', () => {
    expect(schemaUtils.getComponentForSchema({ type: ['object', 'null'], properties: {} })).toBe(ObjectSchema)
  })

  it('renders several primitive types with PrimitiveSchema', () => {
    expect(schemaUtils.getComponentForSchema({ type: ['string', 'number'] })).toBe(PrimitiveSchema)
  })

  it('shows each type and a nullable badge in the primitive view', () => {
    const wrapper = mount(PrimitiveSchema, { props: { schema: { type: ['string', 'null'] } } })
    expect(wrapper.text()).toContain('string')
    expect(wrapper.text()).toMatch(/nullable/i)
    expect(wrapper.text()).not.toContain('[')
  })

  it('shows a readable type label in the object property table', () => {
    const schema = { type: 'object', properties: { tag: { type: ['string', 'null'] } } }
    const wrapper = mount(ObjectSchema, { props: { schema } })
    expect(wrapper.find('tbody .slds-badge').text()).toBe('string | null')
  })
})
