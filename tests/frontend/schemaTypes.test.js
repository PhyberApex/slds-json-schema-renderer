import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ArraySchema from '@/components/schema/ArraySchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import { normalizeTypes, schemaUtils } from '@/utils/schemaRegistry.js'

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

  it('shows a nullable badge on nullable object and array headers', () => {
    const object = mount(ObjectSchema, { props: { schema: { type: ['object', 'null'], properties: {} } } })
    const array = mount(ArraySchema, { props: { schema: { type: ['array', 'null'], items: { type: 'string' } } } })
    expect(object.find('.type-badges').text()).toMatch(/object.*nullable/s)
    expect(array.find('.type-badges').text()).toMatch(/array.*nullable/s)
  })
})
