import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CompositionSchema from '@/components/schema/CompositionSchema.vue'

function mountComposition(schema) {
  return mount(CompositionSchema, { props: { schema, rootSchema: schema } })
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
