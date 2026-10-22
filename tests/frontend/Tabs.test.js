import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import SchemaViewer from '@/components/schema/SchemaViewer.vue'
import Tabs from '@/components/schema/Tabs.vue'

const tabs = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
]

function mountTabs(initial = 'one') {
  const Host = defineComponent({
    setup() {
      const active = ref(initial)
      return () => h(Tabs, { tabs, 'modelValue': active.value, 'onUpdate:modelValue': value => (active.value = value) }, {
        panel: ({ tab }) => h('p', `${tab.label} panel`),
      })
    },
  })
  return mount(Host, { attachTo: document.body })
}

describe('tabs', () => {
  it('marks only the active tab as selected and hides the other panels', () => {
    const wrapper = mountTabs('two')
    const tabEls = wrapper.findAll('[role="tab"]')

    expect(tabEls.map(tab => tab.attributes('aria-selected'))).toEqual(['false', 'true', 'false'])
    expect(tabEls.map(tab => tab.attributes('tabindex'))).toEqual(['-1', '0', '-1'])

    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels.map(panel => panel.attributes('hidden') !== undefined)).toEqual([true, false, true])
    expect(panels[1].text()).toBe('Two panel')
    wrapper.unmount()
  })

  it('links tabs and panels with ids that stay unique across instances in one app', () => {
    const Host = defineComponent({
      setup() {
        return () => h('div', [1, 2].map(() => h(Tabs, { tabs, modelValue: 'one' })))
      },
    })
    const wrapper = mount(Host, { attachTo: document.body })

    const tabEls = wrapper.findAll('[role="tab"]')
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(tabEls).toHaveLength(6)
    tabEls.forEach((tab, index) => {
      expect(tab.attributes('aria-controls')).toBe(panels[index].attributes('id'))
      expect(panels[index].attributes('aria-labelledby')).toBe(tab.attributes('id'))
    })

    const allIds = [...document.querySelectorAll('[id]')].map(el => el.id)
    expect(new Set(allIds).size).toBe(allIds.length)
    wrapper.unmount()
  })

  it('activates tabs from the keyboard with arrow, Home and End keys', async () => {
    const wrapper = mountTabs()
    const tabEls = wrapper.findAll('[role="tab"]')

    await tabEls[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.find('[aria-selected="true"]').text()).toBe('Two')
    expect(document.activeElement.textContent.trim()).toBe('Two')

    await tabEls[1].trigger('keydown', { key: 'End' })
    expect(wrapper.find('[aria-selected="true"]').text()).toBe('Three')

    await tabEls[2].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.find('[aria-selected="true"]').text()).toBe('One')

    await tabEls[0].trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.find('[aria-selected="true"]').text()).toBe('Three')

    await tabEls[2].trigger('keydown', { key: 'Home' })
    expect(wrapper.find('[aria-selected="true"]').text()).toBe('One')
    wrapper.unmount()
  })

  it('uses real buttons so Enter and Space activate through click', async () => {
    const wrapper = mountTabs()
    const tabEls = wrapper.findAll('[role="tab"]')
    expect(tabEls.every(tab => tab.element.tagName === 'BUTTON')).toBe(true)

    await tabEls[2].trigger('click')
    expect(wrapper.find('[aria-selected="true"]').text()).toBe('Three')
    wrapper.unmount()
  })
})

describe('schema viewer tabs', () => {
  it('exposes Visual and Plain JSON as accessible tabs with distinct ids per viewer', () => {
    const schema = { type: 'object', properties: { child: { type: 'string' } } }
    const wrapper = mount(SchemaViewer, { props: { schema, isRoot: true }, attachTo: document.body })

    const tabEls = wrapper.findAll('[role="tab"]')
    expect(tabEls.slice(0, 2).map(tab => tab.text())).toEqual(['Visual', 'Plain JSON'])
    expect(tabEls[0].attributes('aria-selected')).toBe('true')
    expect(tabEls[1].attributes('aria-selected')).toBe('false')
    expect(document.getElementById(tabEls[0].attributes('aria-controls'))).not.toBeNull()
    wrapper.unmount()
  })
})
