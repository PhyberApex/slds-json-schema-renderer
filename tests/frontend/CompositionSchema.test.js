import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import { compositionKeywords } from '@/utils/schemaRegistry.js'

function mountComposition(schema, keyword = compositionKeywords(schema)[0]) {
  return mount(CompositionSchema, { props: { schema, keyword } })
}

function mountViewer(schema) {
  return mount(SchemaViewer, { props: { schema, isRoot: true } })
}

describe('compositionSchema badge', () => {
  it.each([
    ['oneOf', 'slds-badge_success', 'One Of'],
    ['anyOf', 'slds-badge_warning', 'Any Of'],
    ['allOf', 'slds-badge_inverse', 'All Of'],
  ])('colours the %s badge with %s', (keyword, className, label) => {
    const wrapper = mountComposition({ [keyword]: [{ type: 'string' }, { type: 'number' }] })
    const badge = wrapper.find('.slds-badge')
    expect(badge.text()).toContain(label)
    expect(badge.classes()).toContain(className)
  })
})

describe('compositionSchema input handling', () => {
  it('leaves the sub-schemas untouched after rendering', () => {
    const schema = { type: 'object', oneOf: [{ required: ['kind'] }, { title: 'B' }] }
    const before = structuredClone(schema)

    mountComposition(schema)

    expect(schema).toEqual(before)
  })

  it('shows the parent type as the display type of a branch that declares none', () => {
    const wrapper = mountComposition({ type: 'object', oneOf: [{ required: ['kind'] }] })
    expect(wrapper.text()).toMatch(/Schema Type: object/)
  })
})

describe('composition alongside other keywords', () => {
  it('lists every composition keyword present on a schema', () => {
    expect(compositionKeywords({ allOf: [], anyOf: [], type: 'object' })).toEqual(['allOf', 'anyOf'])
    expect(compositionKeywords({ type: 'string' })).toEqual([])
  })

  it('renders the base properties and the oneOf branches of a mixed schema', () => {
    const wrapper = mountViewer({
      type: 'object',
      properties: { kind: { type: 'string' } },
      required: ['kind'],
      oneOf: [{ properties: { kind: { const: 'a' } } }, { title: 'B' }],
    })

    expect(wrapper.find('tbody').text()).toContain('kind')
    expect(wrapper.text()).toContain('One Of')
    expect(wrapper.findAll('.composition-tabs > ul [role="tab"]').map(tab => tab.text())).toEqual(['Option 1', 'B'])
  })

  it('renders a section for each composition keyword when several are present', () => {
    const wrapper = mountViewer({ allOf: [{ type: 'object' }], anyOf: [{ type: 'string' }] })
    expect(wrapper.text()).toContain('All Of')
    expect(wrapper.text()).toContain('Any Of')
  })

  it('does not claim a pure composition schema accepts any value', () => {
    const wrapper = mountViewer({ oneOf: [{ type: 'string' }, { type: 'number' }] })
    expect(wrapper.text()).not.toMatch(/any JSON value/i)
    expect(wrapper.text()).not.toMatch(/unknown schema/i)
  })

  it('stacks allOf branches instead of putting them in tabs', () => {
    const wrapper = mountComposition({ allOf: [{ title: 'Base', type: 'object' }, { title: 'Mixin', type: 'object' }] })
    expect(wrapper.find('.composition-tabs').exists()).toBe(false)
    expect(wrapper.text()).toContain('Base')
    expect(wrapper.text()).toContain('Mixin')
  })
})
