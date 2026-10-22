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
