import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import UnknownSchemaMessage from '@/components/schema/UnknownSchemaMessage.vue'
import { applicatorKeywords } from '@/utils/schemaRegistry.js'

function mountViewer(schema) {
  return mount(SchemaViewer, {
    props: { schema, isRoot: true },
  })
}

describe('applicatorKeywords', () => {
  it('lists the applicator keywords present on a schema', () => {
    expect(applicatorKeywords({
      not: {},
      then: {},
      propertyNames: {},
      type: 'object',
    })).toEqual(['not', 'then', 'propertyNames'])
    expect(applicatorKeywords(true)).toEqual([])
  })
})

describe('applicators section', () => {
  it('renders not and if/then/else instead of an unknown-schema warning', () => {
    const wrapper = mountViewer({
      not: { type: 'null' },
      if: { type: 'string' },
      then: { minLength: 1 },
    })

    expect(wrapper.text()).not.toMatch(/unknown schema/i)
    expect(wrapper.text()).toMatch(/must not match/i)
    expect(wrapper.text()).toContain('If')
    expect(wrapper.text()).toContain('Then')
    expect(wrapper.text()).not.toContain('Else')
  })

  it('renders array-form dependencies as property → required properties', () => {
    const wrapper = mountViewer({
      type: 'object',
      dependencies: {
        billing: ['address', 'card'],
      },
    })
    const row = wrapper.find('.dependencies tbody tr')
    expect(row.text()).toContain('billing')
    expect(row.text()).toContain('address, card')
  })

  it('renders schema-form dependencies and dependentSchemas as nested schemas', () => {
    const wrapper = mountViewer({
      type: 'object',
      dependencies: {
        a: {
          required: ['b'],
        },
      },
      dependentSchemas: {
        c: {
          properties: {
            d: { type: 'string' },
          },
        },
      },
    })
    const text = wrapper.find('.dependencies').text()
    expect(text).toContain('a')
    expect(text).toContain('c')
    expect(text).toContain('d')
  })

  it('renders propertyNames as a nested schema', () => {
    const wrapper = mountViewer({
      type: 'object',
      propertyNames: { pattern: '^[a-z]+$' },
    })
    expect(wrapper.text()).toMatch(/property names/i)
    expect(wrapper.text()).toContain('^[a-z]+$')
  })

  it('renders annotation badges and the $comment', () => {
    const wrapper = mountViewer({
      type: 'string',
      readOnly: true,
      deprecated: true,
      $comment: 'internal note',
    })
    const badges = wrapper.findAll('.annotations .slds-badge').map(badge => badge.text())
    expect(badges).toEqual(['read-only', 'deprecated'])
    expect(wrapper.find('.annotations').text()).toContain('internal note')
  })
})

describe('unknownSchemaMessage', () => {
  it('lists the keywords it saw', () => {
    const wrapper = mount(UnknownSchemaMessage, {
      props: {
        keywords: ['type', 'foo'],
      },
    })
    expect(wrapper.text()).toContain('type')
    expect(wrapper.text()).toContain('foo')
  })

  it('is shown with the schema keywords for an unrecognised type', () => {
    const wrapper = mountViewer({ type: 'thing', foo: 1 })
    expect(wrapper.text()).toMatch(/unknown schema/i)
    expect(wrapper.text()).toContain('foo')
  })
})
