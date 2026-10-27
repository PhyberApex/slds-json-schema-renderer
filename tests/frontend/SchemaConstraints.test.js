import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ConstSchema from '@/components/schema/ConstSchema.vue'
import EnumSchema from '@/components/schema/EnumSchema.vue'
import PrimitiveSchema from '@/components/schema/PrimitiveSchema.vue'
import SchemaConstraints from '@/components/schema/SchemaConstraints.vue'

function items(wrapper) {
  return Object.fromEntries(
    wrapper.findAll('.constraint-item').map(item => [
      item.find('.constraint-label').text(),
      item.find('.constraint-value').text(),
    ]),
  )
}

describe('schemaConstraints', () => {
  it('shows format, default, examples and multipleOf', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: {
          type: 'string',
          format: 'email',
          default: 'a@b.c',
          examples: ['x@y.z'],
          multipleOf: 2,
        },
      },
    })

    expect(items(wrapper)).toEqual({
      'Format': 'email',
      'Default': '"a@b.c"',
      'Examples': '"x@y.z"',
      'Multiple Of': '2',
    })
  })

  it('renders several examples one per line', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: {
          examples: ['a', 1],
        },
      },
    })
    expect(wrapper.find('.constraint-value').text()).toBe('"a"\n1')
  })

  it('shows const, content keywords and contains bounds', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: {
          const: 'fixed',
          contentMediaType: 'image/png',
          contentEncoding: 'base64',
          minContains: 1,
          maxContains: 3,
        },
      },
    })

    expect(items(wrapper)).toEqual({
      'Const': '"fixed"',
      'Content Media Type': 'image/png',
      'Content Encoding': 'base64',
      'Min Contains': '1',
      'Max Contains': '3',
    })
  })

  it('labels any pattern as a pattern regardless of its first character', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: { pattern: '[a-z]+$' },
      },
    })
    expect(items(wrapper)).toEqual({ Pattern: '[a-z]+$' })
    expect(wrapper.find('.constraint-value code').exists()).toBe(true)
  })

  it('folds draft-04 boolean exclusiveMinimum into the minimum label', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: {
          minimum: 0,
          exclusiveMinimum: true,
          maximum: 10,
          exclusiveMaximum: false,
        },
      },
    })
    expect(items(wrapper)).toEqual({ 'Minimum (exclusive)': '0', 'Maximum': '10' })
  })

  it('keeps numeric exclusive bounds as their own entries', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: { exclusiveMinimum: 0 },
      },
    })
    expect(items(wrapper)).toEqual({ 'Exclusive Minimum': '0' })
  })

  it('renders booleans as Yes / No', () => {
    const wrapper = mount(SchemaConstraints, {
      props: {
        schema: { uniqueItems: true },
      },
    })
    expect(items(wrapper)).toEqual({ 'Unique Items': 'Yes' })
  })
})

describe('format next to the type', () => {
  it('shows the format badge beside the type in the primitive view', () => {
    const wrapper = mount(PrimitiveSchema, {
      props: {
        schema: { type: 'string', format: 'date-time' },
      },
    })
    const badges = wrapper.findAll('.type-badges .slds-badge').map(badge => badge.text())
    expect(badges).toEqual(['string', 'date-time'])
  })
})

describe('const and enum combined with a type', () => {
  it('shows the declared type and constraints with a const', () => {
    const wrapper = mount(ConstSchema, {
      props: {
        schema: { type: 'string', const: 'x', minLength: 1 },
      },
    })
    expect(wrapper.text()).toContain('string')
    expect(wrapper.text()).toContain('Min Length')
    expect(wrapper.findAll('.constraint-label').map(label => label.text())).not.toContain('Const')
  })

  it('shows the declared type and constraints with an enum', () => {
    const wrapper = mount(EnumSchema, {
      props: {
        schema: {
          type: 'integer',
          enum: [1, 2],
          default: 1,
        },
      },
    })
    expect(wrapper.text()).toContain('integer')
    expect(wrapper.text()).toContain('Default')
  })
})
