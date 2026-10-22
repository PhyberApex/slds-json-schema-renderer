import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ArraySchema from '@/components/schema/ArraySchema.vue'
import ObjectSchema from '@/components/schema/ObjectSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import { effectiveTypes, inferTypes, isTypeInferred, schemaUtils } from '@/utils/schemaRegistry.js'

describe('inferTypes', () => {
  it.each([
    [{ properties: { a: {} } }, ['object']],
    [{ required: ['a'] }, ['object']],
    [{ additionalProperties: false }, ['object']],
    [{ items: { type: 'string' }, minItems: 1 }, ['array']],
    [{ contains: {} }, ['array']],
    [{ minLength: 3 }, ['string']],
    [{ format: 'email' }, ['string']],
    [{ minimum: 0 }, ['number']],
    [{ multipleOf: 2 }, ['number']],
    [{ description: 'anything' }, []],
    [{ type: 'string', properties: {} }, []],
  ])('infers %j → %j', (schema, expected) => {
    expect(inferTypes(schema)).toEqual(expected)
  })

  it('reports whether the effective type was inferred', () => {
    expect(effectiveTypes({ properties: {} })).toEqual(['object'])
    expect(isTypeInferred({ properties: {} })).toBe(true)
    expect(effectiveTypes({ type: 'object' })).toEqual(['object'])
    expect(isTypeInferred({ type: 'object' })).toBe(false)
  })
})

describe('schemas without an explicit type', () => {
  it.each([
    [{ properties: { a: { type: 'string' } } }, ObjectSchema],
    [{ items: { type: 'string' }, minItems: 1 }, ArraySchema],
    [{ minLength: 3 }, PrimitiveSchema],
    [{ maximum: 10 }, PrimitiveSchema],
  ])('picks a component for %j', (schema, component) => {
    expect(schemaUtils.getComponentForSchema(schema)).toBe(component)
  })

  it('renders a schema with only title and description as accepting any value', () => {
    const wrapper = mount(SchemaViewer, { props: { schema: { title: 'Free', description: 'anything' }, isRoot: true } })
    expect(wrapper.text()).not.toMatch(/unknown schema/i)
    expect(wrapper.text()).toMatch(/any/i)
  })

  it('marks the inferred type in the badge', () => {
    const schema = { properties: { a: { type: 'string' } } }
    const wrapper = mount(ObjectSchema, { props: { schema, rootSchema: schema } })
    expect(wrapper.text()).toMatch(/object \(inferred\)/)
  })

  it('marks inferred types in the property table', () => {
    const schema = { type: 'object', properties: { typeless: { properties: { a: { type: 'string' } } } } }
    const wrapper = mount(ObjectSchema, { props: { schema, rootSchema: schema } })
    expect(wrapper.find('tbody .slds-badge').text()).toBe('object (inferred)')
  })
})
