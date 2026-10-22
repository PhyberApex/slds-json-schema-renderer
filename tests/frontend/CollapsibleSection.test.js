import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ApplicatorsSection from '@/components/schema/ApplicatorsSection.vue'
import CollapsibleSection from '@/components/schema/CollapsibleSection.vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'

describe('collapsibleSection', () => {
  it('toggles its content with an accessible button', async () => {
    const wrapper = mount(CollapsibleSection, {
      props: { title: 'Not', initiallyExpanded: false },
      slots: { default: '<p>body</p>' },
    })
    const button = wrapper.get('button')

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('p').exists()).toBe(false)

    await button.trigger('click')

    expect(button.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('p').text()).toBe('body')
    expect(button.attributes('aria-controls')).toBe(wrapper.get('.slds-section__content').attributes('id'))
  })
})

describe('applicator blocks', () => {
  const schema = { type: 'object', not: { type: 'null' }, propertyNames: { pattern: '^a' } }

  it('are expanded at the root and collapsed when nested', () => {
    const root = mount(ApplicatorsSection, { props: { schema, expanded: true } })
    expect(root.findAll('button[aria-expanded]').map(b => b.attributes('aria-expanded'))).toEqual(['true', 'true'])

    const nested = mount(SchemaViewer, { props: { schema: { type: 'array', items: schema }, isRoot: true } })
    const nestedToggles = nested.findAll('.applicators button[aria-expanded]')
    expect(nestedToggles.length).toBe(2)
    expect(nestedToggles.map(b => b.attributes('aria-expanded'))).toEqual(['false', 'false'])
  })
})
